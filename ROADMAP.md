# Double Take — Modernization Roadmap

This fork picks up maintenance of Double Take after a long upstream gap. The
notes below track the plan for bringing the project up to date while keeping it
working. Phases are ordered by leverage: establish ownership and a safety net
first, then take on the larger modernization jumps behind that net.

## Status legend

- ✅ done
- ⬜ planned

---

## Phase 0 — Fork ownership

Make the fork actually build, ship, and point at the right place.

- ✅ Repoint `package.json` (root/api/frontend) `repository` / `bugs` /
  `homepage` to the fork (original author credit retained).
- ✅ Make `build.yml` run on this fork instead of being gated to the upstream
  repo; image name defaults to the GitHub repo and is overridable with a
  `DOCKER_IMAGE` repository variable; Docker push is skipped gracefully until
  `DOCKER_USERNAME` / `DOCKER_PASSWORD` secrets are set (the image still builds
  in CI for validation).
- ⬜ Add the publishing secrets, or switch the registry to GHCR
  (`ghcr.io/<owner>/double-take`) using the built-in `GITHUB_TOKEN` — no extra
  account needed, a good default for a fork.
- ⬜ Confirm `release.yml` (semantic-release) works on the fork; it currently
  expects a `PAT` secret. Consider falling back to `GITHUB_TOKEN` with
  `contents: write` if release automation isn't needed to trigger downstream
  builds.
- ⬜ Refresh `README.md` install instructions and image references to the fork.

## Phase 1 — Safety net (tests + CI)

The codebase shipped with **zero** automated tests. This phase makes later
refactors safe.

- ✅ Add a test harness using the built-in `node:test` runner + `supertest`
  (no heavy new dependencies). Unit tests cover digest auth (RFC 2617 vector),
  JWT sign/verify, validators, and secret redaction; integration tests cover
  auth enforcement, the path-traversal guard, rate-limit headers, and routing.
- ✅ Add `ci.yml` running API tests and the frontend build on every PR and push
  to `master`/`beta`.
- 🔨 Grow coverage: all five detector `normalize` functions are now tested
  (compreface, deepstack, codeprojectai, facebox, rekognition). Still to do:
  detector HTTP calls (mocked), MQTT message handling, and the config loader.
- ⬜ Add a lint/format gate once the existing source is brought fully
  Prettier/ESLint clean (a repo-wide check is red today on legacy files, so it
  was intentionally left out of the initial CI to keep it green).

## Phase 2 — Frontend build tooling: vue-cli → Vite

`@vue/cli-service` (webpack) is effectively end-of-life and is the source of the
remaining dev-only audit warnings.

- ✅ Migrated the Vue 3 app from vue-cli to **Vite 6**. Added `vite.config.js`
  (relative `base`, `@` alias, dev port 8080) and a root `index.html`; replaced
  the webpack-only `ace-builds/webpack-resolver` with `setModuleUrl` +
  `import.meta.glob` for the YAML mode/worker and themes; swapped
  `require('@/assets/...')` for ESM asset imports; migrated `process.env.NODE_ENV`
  to `import.meta.env`; updated the Dockerfiles; removed the vue-cli config files.
  **Verified in a headless browser** (Chromium): app mounts, routes render, all
  API calls 200, the YAML config editor loads, no console errors.

## Phase 3 — Framework majors (behind the test net)

Deferred deliberately during the initial dependency modernization to avoid
high-risk jumps. Tackle one at a time.

- ✅ Express 4 → 5. Removed the obsolete `express-async-errors` shim (Express 5
  forwards rejected promises natively), replaced `'*'` route strings with
  path-less middleware / root mounts, and guarded the empty `UI.PATH` mount.
  Verified via the test suite plus a boot exercising routing, JSON webhooks,
  the 404 catch-all, and the SPA fallback.
- ✅ Joi 17 → 18 (API-compatible drop-in; the validation tests pass unchanged).
  Bumped `engines.node` to `>= 20` to match Joi 18's requirement (Node 18 is
  already EOL, and Docker/CI run 20).
- ⬜ PrimeVue 3 → 4 (largest item — a full theming/component redesign; budget
  real UI work).

## Phase 4 — Detector strategy

Half of the bundled detectors point at abandoned upstreams.

- ✅ Add **CodeProject.AI** support (the API-compatible successor to the
  discontinued DeepStack) — new detector, defaults, config schema, docs, and a
  `normalize` unit test.
- ✅ Flag **DeepStack** and **Facebox** as discontinued upstream in the docs.
- ⬜ Consider fully removing Facebox in a future major.
- ⬜ Lead docs with **CompreFace** (actively maintained, self-hosted) and AWS
  Rekognition (cloud) as the primary options.

## Phase 5 — Runtime & packaging hygiene

- ⬜ Move the Docker base off `ubuntu:20.04` (nearing EOL) to a current base or
  a slim Node image (mind the `canvas` / `better-sqlite3` native build deps).
- ⬜ Reassess the bundled `opencv.js` emscripten blob — a large, optional,
  hard-to-maintain artifact; gate or extract it.

## Cross-cutting hardening (opportunistic)

- ⬜ Tighten the wide-open `app.use('*', cors())`.
- ⬜ Stop the global error handler from serializing raw errors to clients
  (`res.send(err)` leaks stack traces).
- ⬜ Allowlist the `/proxy` SSRF endpoint (fetches arbitrary user-supplied URLs).

---

## Already shipped in this fork

- Security fixes: parameterized a SQL-injection-prone delete, path-traversal
  guards on filesystem/storage/train routes, rate limiting on the disk-reading
  endpoints.
- Dependency modernization: API production vulnerabilities 42 → 0; frontend
  production vulnerabilities → 0 (remaining are dev-only build tooling).
- Replaced the unmaintained `@mhoc/axios-digest-auth` with an in-tree RFC 2617
  implementation (validated against the spec's test vector).
- Runtime: Docker on Node 20 LTS; refreshed CI action versions; `node-sass`
  replaced with Dart `sass`.
- Performance: image endpoints stream instead of buffering; non-blocking EXIF
  reads.
