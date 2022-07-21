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
const END_POINT = '/balance/deposit';

describe('Rota Balance deposit', function () {
  const client = { email: 'george@gmail.com', password: '1234' };

  it('Deve ser possivel depositar um valor em um cliente', async function () {
    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .post(END_POINT)
    .send({ balance: 100 })
    .set('authorization', authorization);

    expect(response.status).toBe(201);
    expect(response.body.balance).toBe(100);
  });

  it('Nao deve ser possivel depositar valores negativos', async function () {
    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .post(END_POINT)
    .send({ balance: -100 })
    .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Saldo inválido');
  });

  it('Nao deve ser possivel depositar valores nulos', async function () {
    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .post(END_POINT)
    .send({ balance: 0 })
    .set('authorization', authorization);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Saldo inválido');
  });
});
