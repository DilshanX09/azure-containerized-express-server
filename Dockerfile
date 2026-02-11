FROM node:24-alpine3.22

# Set the working directory in the container
WORKDIR /app

# Set environment variables for the application
ENV PORT=80
ENV NODE_ENV=production

# Copy package.json and Prisma schema files to the container
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm ci --only=production && npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 80

CMD npx prisma migrate deploy && npm start