FROM node:20-alpine
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app




COPY package*.json ./


RUN npm install 


COPY . .

# Prisma generate
RUN npx prisma generate

# Build NestJS
RUN npm run build

# Expose port

EXPOSE 3333

# Start app
CMD ["node", "dist/src/main.js"]
