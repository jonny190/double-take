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
  `DOCKER_IMAGE` repository variable.
- ✅ Publish images to GHCR (`ghcr.io/jonny190/double-take`) using the built-in
  `GITHUB_TOKEN`, so no registry account or secrets are needed. The compose
  example in `README.md` points at the GHCR image. One-time follow-up after the
  first push: set the package to public in its GitHub package settings and link
  it to the repo.
- ✅ Confirmed `release.yml` (semantic-release) works on the fork: with the
  `PAT` secret set it has cut every release from v1.14.0 onward, each
  triggering the GHCR image build.
- ✅ Refreshed `README.md` for the fork: badges point at the fork's releases
  and GHCR package (dropped the upstream Docker Hub / Discord badges), the
  compose example uses the GHCR image, a fork note credits the original author,
  and the donations section now frames sponsorship as supporting upstream.

## Phase 1 — Safety net (tests + CI)

The codebase shipped with **zero** automated tests. This phase makes later
refactors safe.

- ✅ Add a test harness using the built-in `node:test` runner + `supertest`
  (no heavy new dependencies). Unit tests cover digest auth (RFC 2617 vector),
  JWT sign/verify, validators, and secret redaction; integration tests cover
  auth enforcement, the path-traversal guard, rate-limit headers, and routing.
- ✅ Add `ci.yml` running API tests and the frontend build on every PR and push
  to `master`/`beta`.
- ✅ Grow coverage: all five detector `normalize` functions are tested, the
  config loader is covered (`!secret` resolution, defaults merging,
  memoization, redaction), the HTTP detectors' request building is asserted via
  an axios adapter stub (endpoint/method/auth for compreface, codeprojectai,
  deepstack, facebox), and `mqtt.recognize()`'s publish payloads are covered
  (person count, per-name match + Home Assistant discovery, unknown, topic
  slugifying). Fixing the MQTT test also surfaced a real leak: the 30s
  person-reset timer was not `unref()`-ed, so it kept the process alive on
  shutdown.
- ✅ Added a lint gate to CI. The API is now ESLint/Prettier clean (fixed a
  real `no-promise-executor-return` in `sleep.util`, told the import resolver
  about the `node:` builtin scheme, and Prettier-formatted the rest) and ships
  its own `lint` script and eslint devDependencies so it lints standalone. A
  new `lint` CI job runs `npm run lint` for both `api/` and `frontend/` on
  every PR/push (installed with `--ignore-scripts`, so no native builds). The
  frontend still emits Prettier *warnings* (non-fatal); tightening those to
  errors is a future cleanup.

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
- ✅ PrimeVue 3 → 4. Adopted v4 styled mode with the **Lara preset** and a
  `.dark`-class dark mode. Replaced the 40 downloadable theme-CSS files (and the
  runtime `theme-link` swapping) with a simple **dark/light** picker; renamed
  `Dropdown → Select`; inlined the removed `DomHandler.findSingle`; updated the
  backend theme defaults/validation. **Verified in headless Chromium**: all views
  render in both light and dark, the theme toggle works end-to-end, and there are
  no console errors. (Some custom CSS still targets a few v3 component class
  names that Lara restyles by default — cosmetic cleanup, tracked below.)
- ✅ Cosmetic follow-up: swept the remaining v3 class names in custom CSS to
  their v4 equivalents (`.p-dropdown*` -> `.p-select*`, TabMenu's
  `.p-tabmenuitem .p-menuitem-link` -> `.p-tabmenu-item-link`, Menu's
  `.p-menuitem*`/`.p-submenu-header` -> `.p-menu-item*`/`.p-menu-submenu-label`),
  and fixed the fixed-header layout: view content now pads for the toolbar plus
  header stack, with heights tracked live via ResizeObserver instead of a
  one-shot measurement at mount.

## Phase 4 — Detector strategy

Half of the bundled detectors point at abandoned upstreams.

- ✅ Add **CodeProject.AI** support (the API-compatible successor to the
  discontinued DeepStack) — new detector, defaults, config schema, docs, and a
  `normalize` unit test.
- ✅ Flag **DeepStack** and **Facebox** as discontinued upstream in the docs.
- ⬜ Consider fully removing Facebox in a future major.
- ✅ Reworked the README detector section to lead with **CompreFace** and AWS
  **Rekognition**, then CodeProject.AI, with DeepStack/Facebox demoted to a
  "legacy" group. Added honest maintenance-status notes (a mid-2026 research
  pass found every self-hosted DeepStack/CompreFace-style backend is now
  dormant or quiet) and a note that **Frigate 0.16**'s native face recognition
  covers the common Frigate-only case without Double Take, with the
  `update_sub_labels` conflict called out.
- ✅ Evaluated adding a new detector (mid-2026 research). Conclusion: no
  compelling drop-in exists. Actively-maintained engines (InsightFace-REST,
  Immich) return raw embeddings or have no standalone recognition API, so they
  do not match either normalized shape and would need new client-side matching
  logic. Not worth adding now; documented the landscape instead.

## Phase 5 — Runtime & packaging hygiene

- ✅ Moved the Docker base from `ubuntu:20.04` (past EOL) to
  `node:20-bookworm-slim` for both the production and dev images. No more
  NodeSource script or compiler toolchain: `canvas`, `sharp`, and
  `better-sqlite3` all install from prebuilt binaries on amd64/arm64.
  Dependency layers now use `npm ci` with lockfiles, so they cache until a
  lockfile changes. Image size dropped from 1.73GB to 547MB (415MB to 121MB
  compressed). arm/v7 stays out of the matrix: official `node` images do ship
  arm/v7 variants, but `canvas` has no armhf prebuild, so restoring it means
  from-source compiles under QEMU.
- ✅ Reassessed the bundled `opencv.js` emscripten blob (~8.5MB). It turned out
  to already be well-gated: it is `require()`d lazily inside `opencv.load()`,
  which `server.js` only calls when a detector sets `opencv_face_required`, so a
  default install never loads it. As a vendored file (not an npm dep) it doesn't
  touch `node_modules` or the dependency tree, so extraction buys little and was
  skipped. Fixed a latent bug found while reviewing it: the Haar cascade was
  loaded via a hardcoded `./api/src/...` path that only resolved when the
  process cwd was the repo root; it now mounts the module's own directory into
  the emscripten FS and loads by an absolute path, verified cwd-independent by
  detecting a face in the bundled test image from a temp directory. Documented
  the blob and its gating in CONTRIBUTING.

## Cross-cutting hardening (opportunistic)

- ✅ Restricted CORS to the dev server only. The UI is served same-origin by
  the API, so production sends no `Access-Control-Allow-Origin` header.
- ✅ Stopped the global error handler leaking internals. Pre-`respond`
  middleware errors (e.g. a malformed JSON body) were sent with the native
  `res.send`, serializing the raw error object; it now logs server-side and
  returns only `{ error: message }`.
- ✅ Removed the `/proxy` SSRF endpoint. It fetched arbitrary user-supplied
  URLs and had no caller in the app, so it was removed rather than allowlisted.

---

## Already shipped in this fork

- Telemetry now defaults to off: the upstream endpoint (`api.double-take.io`)
  is unreachable, so the default only produced browser console errors and a
  pointless hourly heartbeat.
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
