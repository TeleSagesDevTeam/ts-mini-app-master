# Builder stage
FROM node:lts-alpine AS builder

ARG BOT_KEY
ARG SECRET
ARG POCKETBASE_URL
ARG BACKEND_TOKEN

ENV BOT_KEY=${BOT_KEY}
ENV SECRET=${SECRET}
ENV POCKETBASE_URL=${POCKETBASE_URL}
ENV BACKEND_TOKEN=${BACKEND_TOKEN}

WORKDIR /app
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
chmod +x /bin/pnpm

COPY . .
RUN pnpm install
RUN pnpm build

# Runtime stage
FROM node:lts-alpine

ARG BOT_KEY
ARG SECRET
ARG POCKETBASE_URL
ARG BACKEND_TOKEN

ENV BOT_KEY=${BOT_KEY}
ENV SECRET=${SECRET}
ENV POCKETBASE_URL=${POCKETBASE_URL}
ENV BACKEND_TOKEN=${BACKEND_TOKEN}

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "./build/index.js"]