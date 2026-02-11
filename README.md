# Azure Containerized Express Server

`A production-ready Express.js server template using MVC architecture, containerized with Docker, and configured for automated CI/CD deployment to Azure Web App.`

**Setup & Installation**\
Follow these steps to get the project running locally in seconds

1. Clone & Install Dependencies

```
git clone https://github.com/DilshanX09/express-server.git
cd express-server
npm install
```

2. Environment Configuration\
   Create your environment file and add your database credentials.

```
# Create the .env file
touch .env

# Open it and add your DATABASE_URL
echo 'DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"' >> .env
echo 'PORT=8080' >> .env
```

3. Database Migration (Prisma)\
   Initialize your database schema and generate the Prisma client.

```
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the Server

```
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

**Testing**\
Testing requires a valid database connection to verify Prisma models and repository logic.

```
# Ensure your .env has a valid DATABASE_URL before running tests
npm test
```

`Note: If you are running tests in a CI environment (like GitHub Actions), ensure the DATABASE_URL is provided as a secret or an environment variable to the test job.`

# Dockerization

`Run the entire stack in a containerized environment to ensure parity with Azure production.`

```
# Build the Docker image
docker build -t express-server:latest .

# Run the container locally (Injecting .env for DB connection)
docker run -d -p 8080:8080 --env-file .env express-server:latest

OR

docker run -d -p 8080:8080 -e DATABASE_URL=.... express-server:latest
```

# Deployment to Azure

**Automated CI/CD**\
The repository includes a GitHub Action workflow. On every push to the main branch:

```
Test: Runs unit/integration tests (Requires DB Connection).
Build: Compiles the Docker image.
Push: Pushes to Azure Container Registry (ACR).
Deploy: Updates the Azure Web App.
```

**Required Secrets**\
Add these to Settings > Secrets and variables > Actions:

`ACR_LOGIN_SERVER`, `ACR_LOGIN_USERNAME`, `ACR_LOGIN_PASSWORD`,
`AZURE_WEBAPP_PUBLISH_PROFILE`, `DATABASE_URL`

```
...
- name: Run Tests
        run: npm test
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
...
```
