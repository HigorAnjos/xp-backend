const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/investment');
const service = require('../../../../services/investment');

describe('Controller Investment Buy', function () {
  it('Buy deve retornar corretamente status code, e objeto com message', async function () {
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

    sinon.stub(service, 'buy').resolves();

    await controller.buy(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ message: 'Investimento efetuado com sucesso' })).to.be.true;

    service.buy.restore();
  });
});
