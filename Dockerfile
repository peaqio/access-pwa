# syntax=docker/dockerfile:experimental
FROM node:12-alpine

RUN apk add openssh-client git python3
WORKDIR /app

ARG NEXT_STATIC_BACKEND_URL
ARG NODE_ENV
ARG REACT_PROFILER
ARG BRANCH

ENV BRANCH=development
ENV NEXT_STATIC_BACKEND_URL=$NEXT_STATIC_BACKEND_URL
ENV REACT_PROFILER=$REACT_PROFILER
#ENV HTTPS=false

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# Run install command with ssh mounted from current user
RUN --mount=type=ssh npm install --unsafe-perm

ENV NODE_ENV=$NODE_ENV

COPY src ./src
COPY access-pwa-styleguide ./access-pwa-styleguide
RUN npm run fonts:update
COPY tsconfig.json ./tsconfig.json
COPY next.config.js ./next.config.js
COPY .babelrc.js ./.babelrc.js
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]
