const supertest = require('supertest');
const shell = require('shelljs');
const server = require('../../../server');

const { sequelize: sequelizeCli } = require('../assets/sequelize');

shell.exec([
  sequelizeCli.drop,
  sequelizeCli.create,
  sequelizeCli.migrate,
  sequelizeCli.seed,
].join(' && '),
  { silent: process.env.DEBUG === 'false' });

const request = supertest(server);
const END_POINT = '/client/login';

describe('Rota Client login', function () {
  it('Deve logar um cliente', async function () {
    const client = {
      email: 'george@gmail.com',
      password: '1234',
    };

    const response = await request.post(END_POINT).send(client);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('Não deve logar um cliente com email não cadastrado', async function () {
    const client = {
      email: 'nao@cadastrado.com',
      password: '1234',
    };

    const response = await request.post(END_POINT).send(client);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Cliente nao encontrado');
  });
});
