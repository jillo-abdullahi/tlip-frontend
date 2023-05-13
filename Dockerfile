# official Node.js 14 image
FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Start a new stage to have a smaller final Docker image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm install --frozen-lockfile --production

# Copy the built files from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# listening port
EXPOSE 3000

CMD ["npm", "start"]
