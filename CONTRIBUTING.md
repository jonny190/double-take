# Contributing / Maintainer's Guide

This is a maintained fork of [Double Take](https://github.com/jakowenko/double-take).
This guide is aimed at whoever is taking over day-to-day maintenance: how the
project is laid out, how to run and test it, and how it ships. For the longer
modernization plan see [`ROADMAP.md`](./ROADMAP.md).

## Tech stack

| Area | Stack |
| --- | --- |
| Runtime | Node.js 20 LTS |
| API | Express 5, better-sqlite3, socket.io, MQTT, sharp, canvas |
| Frontend | Vue 3 + Vite 6, PrimeVue 4 (Lara preset), PrimeFlex |
| Validation | Joi 18 (requests) + jsonschema (config) |
| Detectors | CompreFace, CodeProject.AI, DeepStack, Facebox, AWS Rekognition |
| Packaging | Docker (`node:20-bookworm-slim`, amd64/arm64), semantic-release |

## Repository layout

```
api/            Express API + processing pipeline
  src/
    controllers/  route handlers
    routes/       express routers (+ request validation)
    util/         detectors, db, mqtt, storage, frigate, auth, ...
    constants/    config loader, defaults, schema-validated settings
    schemas/      jsonschema for the user config.yml
  test/         node:test + supertest suites
frontend/       Vue 3 + Vite single-page app
  src/          views/, components/, services/, util/
  index.html    Vite entry (public assets in public/)
.build/         production Dockerfile + entrypoint
.develop/       docker-compose dev stack (mosquitto, etc.)
.github/        CI: ci.yml, codeql, build (images), release
ROADMAP.md      phased modernization plan
```

## Local development

Requirements: Node 20+. The native modules (`canvas`, `sharp`,
`better-sqlite3`) install from prebuilt binaries on common platforms; you only
need the `canvas` build deps (`libcairo2-dev libpango1.0-dev libjpeg-dev
libgif-dev librsvg2-dev`) if no prebuild exists for yours.

```bash
# API (port 3000)
cd api && npm install && npm start        # or: npm run debug (nodemon)

# Frontend (dev server on port 8080; in dev the app calls the API on :3000)
cd frontend && npm install && npm run serve
```

Runtime state lives in `./.storage` (override with `STORAGE_PATH`). On first
run the API creates `config/config.yml` and `config/secrets.yml`. Secrets are
referenced from the config with the `!secret <key>` tag.

Useful env vars: `STORAGE_PATH`, `CONFIG_PATH`, `SECRETS_PATH`, `MEDIA_PATH`,
`HA_ADDON`.

## Testing

The API has a `node:test` + `supertest` suite (no extra test runner):

```bash
cd api && npm test
```

It covers request validation and auth enforcement, the path-traversal guards,
rate-limit headers, every detector's `normalize()`, and the config loader
(`!secret` resolution, defaults merging, memoization, redaction). Add new tests
as `api/test/*.test.js`; each file isolates its own temp `STORAGE_PATH`.

There is no automated frontend test yet — verify UI changes by building
(`npm run build`) and exercising the app in a browser. CI validates the build.

## Continuous integration

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `ci.yml` | every PR / push to `master`,`beta` | API tests + frontend build |
| `codeql-analysis.yml` | push/PR to `master`, weekly | security scanning |
| `release.yml` | push to `master`,`beta` | semantic-release |
| `build.yml` | on a published release | build + push Docker images |

CI only checks that the frontend **builds**; it does not run the UI. Verify
frontend behaviour manually.

## Releasing & publishing images

Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:`, `fix:`, `chore:`, …). `semantic-release` reads them on push to
`master`/`beta` to bump the version, update `CHANGELOG.md`, and cut a GitHub
release, which triggers `build.yml`.

`build.yml` publishes images to **GHCR** (`ghcr.io/jonny190/double-take`) using
the built-in `GITHUB_TOKEN`, so no registry account or extra secrets are
needed. Releases from `master` push `:latest` and `:<version>` (multi-arch);
releases from `beta` push `:beta` (amd64 only). Notes:

- The first push creates the package as **private**. To allow public pulls,
  set it to public once in the package settings on GitHub (Packages ->
  double-take -> Package settings -> Change visibility) and link it to the
  repo.
- The image name (registry included) can be overridden with a `DOCKER_IMAGE`
  repository variable, but the login step in `build.yml` targets `ghcr.io`, so
  pushing elsewhere also requires adjusting the login.
- A `workflow_dispatch` run from a branch other than `master`/`beta` builds
  without pushing (validation only).

`release.yml` uses a `PAT` secret so the release it creates can trigger the
image build; events created with the built-in `GITHUB_TOKEN` do not start
other workflows, so the PAT is required for the release -> build chain to
work.

## How processing works (quick tour)

1. A detection arrives — a Frigate MQTT event, a camera snapshot, or a manual
   upload — and hits `POST /api/recognize` (`recognize.controller`).
2. `frigate.util`/`schedule.util` decide whether to process it.
3. The image is pulled (`process.util`, with digest-auth support in
   `digest.util`) and sent to each configured detector
   (`util/detectors/*`), whose `normalize()` maps the response to a common
   match/box shape.
4. Results are saved (`db.util`, `storage.util`), published over MQTT and
   sockets, and any notifiers fire (`util/notify/*`).

Adding a detector: create `util/detectors/<name>.js` (see `codeprojectai.js`
for a template), register it in `util/detectors/index.js`, add its defaults to
`constants/defaults.js`, extend `schemas/index.js`, and add a `normalize` test.

## Conventions

- Match the surrounding code style; Prettier + ESLint configs are in-repo.
- Keep request input validated at the route layer (Joi) and config validated
  against `schemas/`.
- Commit messages are Conventional Commits (they drive releases).
