import request from 'supertest';
import { getConnection } from 'typeorm';
import createConnection from '../database';

import { app } from '../app';

describe('Survery', async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new survery', async () => {
    const response = await request(app).post('/survery').send({
      title: 'teste',
      description: 'teste teste',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to get all surverys', async () => {
    await request(app).post('/survery').send({
      title: 'teste2',
      description: 'teste teste2',
    });

    const response = await request(app).get('/survery');

    expect(response.body.length).toBe(2);
  });
});
