const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/balance');
const service = require('../../../../services/balance');

describe('Controller Balance withdraw', function () {
  it('Deve retornar corretamente status code, e objeto com o saldo atualizado', async function () {
    const MocBalance = 100;
    const req = {};
    const res = {};

    req.body = { balance: 10.50 };

    req.client = {
      id: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'withdraw').resolves(MocBalance);

    await controller.withdraw(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ balance: MocBalance })).to.be.true;
    expect(service.withdraw.calledWith(req.client.id, req.body.balance)).to.be.true;

    service.withdraw.restore();
  }).timeout(5000);
});
