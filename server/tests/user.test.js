const request = require('supertest');
const app = require('../server');
const { connect, closeDatabase, clearDatabase } = require('./setup');
const User = require('../models/UserModel');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('POST /user/register', () => {
  test('kaysajel user jdid b nja7', async () => {
    const res = await request(app).post('/user/register').send({
      nom: 'Mars',
      prenom: 'Abderrazzaq',
      email: 'test@mail.com',
      password: 'password123',
      telephone: '0600000000',
      role: 'admin',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toBe('test@mail.com');
    expect(res.body).not.toHaveProperty('password'); // password machi khassha tban
  });

  test('kayrfd registration ila khass shi field', async () => {
    const res = await request(app).post('/user/register').send({
      nom: 'Mars',
      email: 'test@mail.com',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Please add all fields/i);
  });

  test('kayrfd registration ila email deja mawjod', async () => {
    await request(app).post('/user/register').send({
      nom: 'Mars', prenom: 'Abderrazzaq', email: 'test@mail.com',
      password: 'password123', telephone: '0600000000', role: 'admin',
    });

    const res = await request(app).post('/user/register').send({
      nom: 'Autre', prenom: 'User', email: 'test@mail.com',
      password: 'password456', telephone: '0611111111', role: 'admin',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User already exists/i);
  });
});

describe('POST /user/login', () => {
  beforeEach(async () => {
    await request(app).post('/user/register').send({
      nom: 'Mars', prenom: 'Abderrazzaq', email: 'test@mail.com',
      password: 'password123', telephone: '0600000000', role: 'admin',
    });
  });

  test('kaydkhol b nja7 b credentials s7a7', async () => {
    const res = await request(app).post('/user/login').send({
      email: 'test@mail.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('kayrfd login b password khati2', async () => {
    const res = await request(app).post('/user/login').send({
      email: 'test@mail.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid credentials/i);
  });

  test('kayrfd login b email machi mawjod', async () => {
    const res = await request(app).post('/user/login').send({
      email: 'inconnu@mail.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(400);
  });
});

describe('GET /user/users (route mahmiya b protect)', () => {
  test('kayrfd request bla token', async () => {
    const res = await request(app).get('/user/users');
    expect(res.statusCode).toBe(401);
  });

  test('kayrjaa jami3 les users b token s7i7', async () => {
    const registerRes = await request(app).post('/user/register').send({
      nom: 'Mars', prenom: 'Abderrazzaq', email: 'test@mail.com',
      password: 'password123', telephone: '0600000000', role: 'admin',
    });
    const token = registerRes.body.token;

    const res = await request(app)
      .get('/user/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe('DELETE /user/:id', () => {
  test('kaymsa7 user b nja7', async () => {
    const registerRes = await request(app).post('/user/register').send({
      nom: 'Mars', prenom: 'Abderrazzaq', email: 'test@mail.com',
      password: 'password123', telephone: '0600000000', role: 'admin',
    });
    const { token, _id } = registerRes.body;

    const res = await request(app)
      .delete(`/user/${_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    const check = await User.findById(_id);
    expect(check).toBeNull();
  });

  test('kayrjaa 404 ila l user makaynch', async () => {
    const registerRes = await request(app).post('/user/register').send({
      nom: 'Mars', prenom: 'Abderrazzaq', email: 'test@mail.com',
      password: 'password123', telephone: '0600000000', role: 'admin',
    });
    const token = registerRes.body.token;

    const res = await request(app)
      .delete('/user/6a52621b9419b4250fc80698')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});