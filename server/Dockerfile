# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runner
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install temporary build tools to compile native modules (sqlite3 & bcrypt) if needed
COPY package*.json ./
RUN apt-get update && apt-get install -y python3 make g++ \
    && npm ci --only=production \
    && apt-get purge -y python3 make g++ \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist

# Create a data directory for SQLite database persistence
RUN mkdir -p /app/data && chown -R node:node /app

USER node
EXPOSE 3000

ENV PORT=3000
ENV DATABASE_PATH=/app/data/database.sqlite

CMD ["node", "dist/main"]
