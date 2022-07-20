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
const END_POINT = '/investment/buy';

describe('Rota Investment buy', function () {
  it('Deve ser possivel comprar um ativo', async function () {
    const client = {
      email: 'Buy@gmail.com',
      password: '1234',
    };
    const CODE_INVESTMENT = 1;

    const { body: { token: authorization } } = await login(client, request);

    const response = await request
      .post(END_POINT)
      .send({ code: CODE_INVESTMENT, quantity: 1 })
      .set('authorization', authorization);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Investimento efetuado com sucesso');

    // verificar saldo do cliente
    const responseAccount = await request
      .get('/balance/account')
      .set('authorization', authorization);

    expect(responseAccount.status).toBe(200);
    console.log('Account', responseAccount.body);
    expect(responseAccount.body.balance).toBe('905.69');

    // verificar carteira de ativos do cliente
    const responseActive = await request
      .get(`/active/find/${CODE_INVESTMENT}`)
      .set('authorization', authorization);

    expect(responseActive.status).toBe(200);
    console.log('Active', responseActive.body);
    expect(responseActive.body.products[0].quantity).toBe(1);

    // verificar quantidade de ativos disponivel para venda
    const responseInvestment = await request
      .get(`/investment/${CODE_INVESTMENT}`)
      .set('authorization', authorization);

    expect(responseInvestment.status).toBe(200);
    expect(responseInvestment.body.quantity).toBe(999);
  });
});
