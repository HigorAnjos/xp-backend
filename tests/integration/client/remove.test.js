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
const END_POINT = '/client/delete';

describe('Rota Client remove', function () {
  it('Deve remover um cliente', async function () {
    const client = {
      email: 'Remover@gmail.com',
      password: '1234',
    };
    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .delete(END_POINT)
    .send(client)
    .set('authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Cliente removido com sucesso');
  });

  it('Não deve remover um cliente com saldo na conta', async function () {
    const client = {
      email: 'Julio@gmail.com',
      password: '1234',
    };

    const { body: { token: authorization } } = await login(client, request);
    const response = await request
    .delete(END_POINT)
    .send(client)
    .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Não é possível remover o cliente, pois possui saldo na conta',
    );
  });

  it('Não deve remover um cliente sem saldo com produtos na conta', async function () {
    const client = {
      email: 'george@gmail.com',
      password: '1234',
    };

    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .delete(END_POINT)
    .send(client)
    .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Não é possível remover o cliente, pois possui produtos na conta',
    );
  });
});
