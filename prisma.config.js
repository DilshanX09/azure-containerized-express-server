/*
  * Prisma Config File
  *
  * This file is used to configure the Prisma ORM for the application.
  * It sets up the database connection and other Prisma settings.  
*/

import { defineConfig } from "prisma/config";
require('dotenv').config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
