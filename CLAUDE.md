# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Double Take: a unified UI and API for processing and training images for facial recognition, typically fed by Frigate NVR events over MQTT. This repo (jonny190/double-take) is a maintained fork of jakowenko/double-take. CONTRIBUTING.md is the maintainer's guide and ROADMAP.md tracks the phased modernization plan; keep both in mind before large changes.

## Commands

Three separate package.json files (root, `api/`, `frontend/`), no npm workspaces. Install dependencies in each directory you work in. The `api` package needs Node 20+ and the native build deps for `canvas` (libcairo2-dev, libpango1.0-dev, libjpeg-dev, libgif-dev, librsvg2-dev).

```bash
# API (port 3000)
cd api && npm start          # or npm run debug (nodemon), or `npm run api` from the root

# Frontend dev server (port 8080, expects the API on :3000)
cd frontend && npm run serve

# API tests (node:test + supertest, no separate runner)
cd api && npm test
cd api && node --test test/config.test.js    # single test file

# Frontend lint / build (CI validates the build; there are no frontend tests)
cd frontend && npm run lint
cd frontend && npm run build

# Full docker dev stack (UI :8080, API :3000, mosquitto :1883)
./.develop/docker up
./.develop/docker down
```

Commits must follow Conventional Commits (`feat:`, `fix:`, `chore(api):`, ...) - commitlint enforces this via husky, and semantic-release derives versions and the changelog from commit messages on push to `master`/`beta`. Husky also runs lint-staged (ESLint + Prettier) on commit.

## Architecture

### API (`api/`)

Express 5 app. Request flow is routes -> controllers -> util:

- `src/routes/` - Express routers; request validation lives here using Joi (`util/validators.util.js`)
- `src/controllers/` - route handlers
- `src/util/` - all real logic: detectors, db, mqtt, storage, frigate, auth, etc.

**Config system** (important to understand before touching almost anything): user config lives at `.storage/config/config.yml` with secrets in `secrets.yml` referenced by `!secret <key>` tags. `src/constants/config.js` loads the YAML, resolves secrets, deep-merges with `src/constants/defaults.js`, and memoizes the result. `src/constants/index.js` re-exports it with UPPERCASE keys, which is why code everywhere does `const { SERVER, UI } = require('../constants')();` - note the trailing call. The merged config is validated against the jsonschema in `src/schemas/index.js` at startup. If you add a config option, update `defaults.js` and `schemas/index.js` together.

**Detectors are plugins**: each file in `src/util/detectors/` (compreface, codeprojectai, deepstack, facebox, rekognition) exposes the detector API plus a `normalize()` that maps the service's response to the common match/box shape. To add one: create `util/detectors/<name>.js` (codeprojectai.js is the template), register it in `util/detectors/index.js`, add defaults to `constants/defaults.js`, extend `schemas/index.js`, and add a `normalize()` test. `src/util/notify/` follows the same factory pattern for notifiers.

**Processing pipeline**: a Frigate MQTT event, camera snapshot topic, or `POST /api/recognize` starts it. `frigate.util`/`schedule.util` gate whether to process; `process.util` pulls the image (digest auth in `digest.util`) and loops it through each configured detector until a confident match or retries are exhausted; results go to SQLite (`db.util`, better-sqlite3) and `.storage/matches`, get published over MQTT (`mqtt.util`) and socket.io (`socket.util`), and fire notifiers.

**Runtime state** lives in `./.storage` (override with `STORAGE_PATH`; also `CONFIG_PATH`, `SECRETS_PATH`, `MEDIA_PATH`, `HA_ADDON`). The API creates config/secrets files on first run.

### Frontend (`frontend/`)

Vue 3 + Vite 6 + PrimeVue 4 (Lara preset) single-page app in `src/` (views/, components/, services/, util/). In production the API serves the built `frontend/dist` itself and injects the Home Assistant ingress path into index.html at request time, which is why `vite.config.js` uses a relative `base: './'` and why `app.js` rewrites index.html rather than serving it statically. Keep the dev server on port 8080; the API's constants map :8080 to :3000 in development.

### Tests (`api/test/`)

Each `*.test.js` file isolates its own temp `STORAGE_PATH` so the config memoization and file setup don't leak between suites. Coverage focuses on request validation, auth enforcement, path-traversal guards, rate limiting, every detector's `normalize()`, and the config loader. Follow that isolation pattern when adding tests.

### CI (`.github/workflows/`)

`ci.yml` runs API tests and the frontend build on every PR. `release.yml` runs semantic-release on `master`/`beta` (needs a `PAT` secret so the release event can trigger the image build). `build.yml` builds multi-arch Docker images on a published release and pushes them to GHCR (`ghcr.io/jonny190/double-take`) using the built-in `GITHUB_TOKEN`.
