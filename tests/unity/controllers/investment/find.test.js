const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/investment');
const service = require('../../../../services/investment');

describe('Controller Investment find', function () {
  it('Find deve retornar corretamente status code, e objeto', async function () {
    const MockServiceFind = {
      id: 4,
      name: 'MGLU3',
      price: '20.00',
      quantity: 1000,
      createdAt: '2022-07-22T13:43:54.000Z',
      updatedAt: '2022-07-22T13:43:54.000Z',
    };

    const req = {};
    const res = {};

    req.params = {
      id: 4,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'find').resolves(MockServiceFind);

    await controller.find(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(MockServiceFind)).to.be.true;

    service.find.restore();
  }).timeout(5000);
});
