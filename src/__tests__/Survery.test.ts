import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Survery', async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
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
