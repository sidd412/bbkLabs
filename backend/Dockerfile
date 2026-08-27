# Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Only install production dependencies
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

# Cloud Run automatically sets the PORT environment variable (usually 8080)
EXPOSE 8080

CMD ["npm", "start"]
