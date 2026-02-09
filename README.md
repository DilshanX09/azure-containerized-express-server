# Express Server

A simple and efficient Express.js server template using MVC architecture for building RESTful APIs and web applications.

## Features

- Minimalist and fast web framework
- MVC architecture for organized code structure
- Simple routing and middleware integration
- Built-in JSON request/response support

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or newer)
- [npm](https://www.npmjs.com/)

## Installation

```bash
git clone https://github.com/DilshanX09/express-server.git
cd express-server
npm install
```

## Database Setup

This project uses [Prisma](https://www.prisma.io/) as the ORM and [PostgreSQL](https://www.postgresql.org/) as the database.

1. Ensure you have a running PostgreSQL instance.
2. Configure your database connection in the `.env` file:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

3. Install Prisma CLI and generate the client:

```bash
npm install @prisma/client prisma
npx prisma generate
```

4. Run migrations to set up your database schema:

```bash
npx prisma migrate dev
```

## Routes

- `GET /` - Home page
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
