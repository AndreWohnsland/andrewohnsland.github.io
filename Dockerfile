# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock tsconfig.json .eslintrc.js .prettierrc ./

COPY src ./src

RUN yarn install

RUN yarn tsc

# Stage 2: Create the runtime container
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package.json yarn.lock ./

RUN yarn install --production

EXPOSE 5000

CMD ["node", "dist/index.js"]