const supertest = require('supertest');
const shell = require('shelljs');
const server = require('../../../server');
const login = require('../assets/login');

const { sequelize: sequelizeCli } = require('../assets/sequelize');

shell.exec([
  sequelizeCli.drop,
  sequelizeCli.create,
  sequelizeCli.migrate,
  sequelizeCli.seed,
].join(' && '),
  { silent: process.env.DEBUG === 'false' });

const request = supertest(server);
const END_POINT = '/client/update';

describe('Rota Client update', function () {
  it('Deve atualizar um cliente', async function () {
    const client = {
      email: 'Remover@gmail.com',
      password: '1234',
    };
    const clientToUpdate = {
      email: 'update@gmail.com',
      password: '1234',
    };

    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .put(END_POINT)
    .send(clientToUpdate)
    .set('authorization', authorization);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Cliente atualizado com sucesso');
  });
});
