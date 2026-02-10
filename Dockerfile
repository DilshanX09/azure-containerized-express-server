FROM node:24-alpine3.22

# Set the working directory in the container
WORKDIR /app

# Set environment variables for the application
ENV PORT=8080

# Copy package.json and Prisma schema files to the container
COPY package*.json ./
COPY prisma ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Validate the Prisma schema and generate the Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 8080

CMD ["npm", "start"]