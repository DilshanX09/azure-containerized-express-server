const request = require("supertest");
const app = require("../server");
const { PrismaClient } = require("../generated/prisma/index");
const prisma = require("../src/libs/prisma");

const RESTART_IDENTITY = `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;

beforeAll(async () => {
  await prisma.user.deleteMany();
  await await prisma.$executeRawUnsafe(RESTART_IDENTITY);
});

describe('User API Endpoints', () => {

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/store')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobile: '1234567890',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('message', 'User created successfully.');
  });

  it('should retrieve all users', async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Users retrieved successfully.');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('should retrieve a user by ID', async () => {
    await request(app)
      .get('/api/users/1')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('message', 'User retrieved successfully.');
        expect(res.body.data).toHaveProperty('id', 1);
      });
  });

  it('should update a user by ID', async () => {
    await request(app)
      .put('/api/users/update')
      .send({
        id: 1,
        firstName: 'Jane - updated',
        lastName: 'Doe - updated',
        email: 'jane.doe@example.com',
        mobile: '0987654321',
        password: 'newpassword123'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('message', 'User updated successfully.');
        expect(res.body.data).toHaveProperty('id', 1);
      });
  });

  it('should delete a user by ID', async () => {
    await request(app)
      .delete('/api/users/1')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('message', 'User deleted successfully.');
        expect(res.body.data).toHaveProperty('id', 1);
      });
  });
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$executeRawUnsafe(RESTART_IDENTITY);
  await prisma.$disconnect();
});
