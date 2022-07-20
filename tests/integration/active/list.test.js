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
const END_POINT = '/active/list';

describe('Rota Active list', function () {
  it('Deve ser possivel obter a lista de ativos de um cliente', async function () {
    const client = {
      email: 'george@gmail.com',
      password: '1234',
    };

    const { body: { token: authorization } } = await login(client, request);

    const response = await request
    .get(END_POINT)
    .send(client)
    .set('authorization', authorization);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.products.length).toBe(3);
    expect(response.body.products[0].code).toBe(1);
    expect(response.body.products[0].name).toBe('XPBR31');
    expect(response.body.products[0].salePrice).toBe('94.31');
    expect(response.body.products[0].quantity).toBe(1);
    expect(response.body.products[1].code).toBe(1);
    expect(response.body.products[1].name).toBe('XPBR31');
    expect(response.body.products[1].salePrice).toBe('100.00');
    expect(response.body.products[1].quantity).toBe(1);
    expect(response.body.products[2].code).toBe(2);
    expect(response.body.products[2].name).toBe('VALE3');
    expect(response.body.products[2].salePrice).toBe('10.00');
    expect(response.body.products[2].quantity).toBe(1);
  });
});
