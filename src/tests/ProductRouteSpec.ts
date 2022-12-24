import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Product Endpoints', () => {
  it('should get all products', async () => {
    const res = await request.get('/products/');
    expect(res.status).toBe(200);
  });
  it('should get a product with id ', async () => {
    const res = await request.get('/products/1');
    expect(res.status).toBe(200);
  });
  it('should return 401 without auth header', async () => {
    const res = await request.post('/products/');
    expect(res.status).toBe(401);
  });
});
