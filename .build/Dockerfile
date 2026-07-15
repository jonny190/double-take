FROM node:20-bookworm-slim AS build

# dependency layers first: they only rebuild when a lockfile changes
WORKDIR /double-take/api
COPY api/package.json api/package-lock.json ./
RUN npm ci --omit=dev

WORKDIR /double-take/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

WORKDIR /double-take/api
COPY api/server.js ./
COPY api/src ./src

WORKDIR /double-take/frontend
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/vite.config.js frontend/index.html ./
# the production API serves ./frontend as static files, so the frontend dir
# ends up containing only the built assets
RUN npm run build \
  && mv dist /tmp/dist \
  && rm -r ./* \
  && mv /tmp/dist/* .

FROM node:20-bookworm-slim
ARG DEBIAN_FRONTEND=noninteractive

# jq: entrypoint parses Home Assistant add-on options
# libexpat1: the arm64 canvas prebuild links it (amd64 bundles it)
# nodemon: restarts the API when the config changes (the UI's save flow)
RUN apt-get update \
  && apt-get install -y --no-install-recommends jq libexpat1 \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g nodemon

COPY --from=build /double-take /double-take
COPY .build/entrypoint.sh /double-take/

RUN mkdir /.storage && ln -s /.storage /double-take/.storage

ENV NODE_ENV=production
WORKDIR /double-take
ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]
