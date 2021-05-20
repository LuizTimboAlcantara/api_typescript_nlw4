import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Users', async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@examaple.com.br',
      name: 'User teste',
    });

    expect(response.status).toBe(201);
  });

  it('Sholud not be able to create a user with exists email', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@examaple.com.br',
      name: 'User teste',
    });

    expect(response.status).toBe(400);
  });
});
