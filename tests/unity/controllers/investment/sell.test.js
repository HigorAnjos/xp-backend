const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/investment');
const service = require('../../../../services/investment');

describe('Controller Investment sell', function () {
  it('Sell deve retornar corretamente status code, e objeto com message', async function () {
    const req = {};
    const res = {};

    req.body = {
      code: 'code',
      quantity: 1,
    };

    req.client = {
      id: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'sell').resolves();

    await controller.sell(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ message: 'Venda efetuada com sucesso' })).to.be.true;

    service.sell.restore();
  }).timeout(5000);
});
