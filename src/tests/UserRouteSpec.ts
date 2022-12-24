import supertest from 'supertest';
import app from '../server';
import client from '../database';

const request = supertest(app);

describe('User Endpoints', () => {
  let token: string;
  beforeAll(async () => {
    try {
      const conn = await client.connect();
      const sql = 'TRUNCATE users RESTART IDENTITY CASCADE;';
      await conn.query(sql);
      const res = await request.post('/register').set('Content-Type', 'application/json').send({
        first_name: 'New',
        last_name: 'User',
        email: 'email546@gmail.com',
        password: '123'
      });
      token = res.text;
    } catch (e) {
      console.log('Error occurred while setting up database for Users routes tests');
    }
  });
  it('should return 401 without auth header', async () => {
    const res = await request.get('/users/');
    expect(res.status).toBe(401);
  });
  it('should return 200 with auth header', async () => {
    const res = await request.get('/users/').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
  it('should return 401 without auth header', async () => {
    const res = await request.get('/users/5');
    expect(res.status).toBe(401);
  });
  it('should return 200 with auth header', async () => {
    const res = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
  it('should return 401 without auth header', async () => {
    const res = await request.post('/users/');
    expect(res.status).toBe(401);
  });
  it('should return 200 with auth header', async () => {
    const res = await request
      .post('/users/')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({
        first_name: 'gasser',
        last_name: 'khaled',
        email: 'new@gmail.com',
        password: '1234'
      });
    expect(res.status).toBe(200);
  });
  it('should return 401 without auth header', async () => {
    const res = await request.get('/users/1/current-order');
    expect(res.status).toBe(401);
  });
  it('should return 200 with auth header', async () => {
    const res = await request.get('/users/1/current-order').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
