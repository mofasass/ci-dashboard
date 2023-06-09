FROM node:18-alpine AS dependencies 
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY package.json ./
RUN yarn



FROM node:18-alpine AS builder
RUN apk update
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine AS runner
RUN apk update
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD ["yarn", "start"]