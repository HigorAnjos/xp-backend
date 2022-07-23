const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/balance');
const service = require('../../../../services/balance');

describe('Controller Balance account', function () {
  it('Deve retornar corretamente status code, e objeto com o saldo atualizado', async function () {
    const MocAccount = {
      id: 1,
      clientId: 1,
      balance: 0,
      createdAt: '2022-07-22T13:43:54.000Z',
      updatedAt: '2022-07-22T13:43:54.000Z',
  };

    const req = {};
    const res = {};

    req.client = {
      id: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'account').resolves(MocAccount);

    await controller.account(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(MocAccount)).to.be.true;
    expect(service.account.calledWith(req.client.id)).to.be.true;

    service.account.restore();
  });
});
