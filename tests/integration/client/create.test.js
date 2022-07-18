const supertest = require('supertest');
const shell = require('shelljs');
const server = require('../../../server');
require('dotenv').config();

const { sequelize: sequelizeCli } = require('../assets/sequelize');

shell.exec([
  sequelizeCli.drop,
  sequelizeCli.create,
  sequelizeCli.migrate,
  sequelizeCli.seed,
].join(' && '),
  { silent: process.env.DEBUG === 'false' });

const request = supertest(server);
const END_POINT = '/client/create';

describe('Rota Client create', function () {
  it('Deve criar um novo cliente', async function () {
    const newClient = {
      email: 'newclient@gmail.com',
      password: '123456',
    };

    const response = await request.post(END_POINT).send(newClient);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('Não deve criar um novo cliente com email duplicado', async function () {
    const newClient = {
      email: 'newclient@gmail.com',
      password: '123456',
    };

    const response = await request.post(END_POINT).send(newClient);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Usuário já cadastrado');
  });

  it('Não deve criar um novo cliente sem senha', async function () {
    const newClient = {
      email: 'novocliente@gmail.com',
    };

    const response = await request.post(END_POINT).send(newClient);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Dados insuficientes');
  });

  it('Não deve criar um novo cliente sem email', async function () {
    const newClient = {
      password: '123456',
    };

    const response = await request.post(END_POINT).send(newClient);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Dados insuficientes');
  });
});
