FROM oven/bun:1-alpine AS base
WORKDIR /usr/src/app
RUN apk add --no-cache python3 make g++

FROM base AS install
RUN mkdir -p /temp/app
COPY package.json bun.lock /temp/app/
RUN cd /temp/app && bun install --frozen-lockfile

FROM base AS production
COPY --from=install /temp/app/node_modules node_modules
COPY . .

COPY src ./src
COPY tsconfig.json ./

ENV NODE_ENV=production

USER bun
VOLUME ["/data"]
ENTRYPOINT [ "bun", "run", "src/index.ts" ]