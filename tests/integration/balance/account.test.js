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
const END_POINT = '/balance/account';

describe('Rota Balance account', function () {
  it('Deve ser possivel obter o saldo de um cliente', async function () {
    const client = {
      email: 'Julio@gmail.com',
      password: '1234',
    };

    const { body: { token: authorization } } = await login(client, request);

    console.log('authorization', authorization);

    const response = await request
    .get(END_POINT)
    .send(client)
    .set('authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body.balance).toBe(500);
  });
});
