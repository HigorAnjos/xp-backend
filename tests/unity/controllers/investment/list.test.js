/* eslint-disable sonarjs/prefer-object-literal */
const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/investment');
const service = require('../../../../services/investment');

describe('Controller Investment list', function () {
  it('List deve retornar corretamente status code, e objeto', async function () {
    const MockServiceList = [{
      id: 4,
      name: 'MGLU3',
      price: '20.00',
      quantity: 1000,
      createdAt: '2022-07-22T13:43:54.000Z',
      updatedAt: '2022-07-22T13:43:54.000Z',
    }];

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'list').resolves(MockServiceList);

    await controller.list(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(MockServiceList)).to.be.true;

    service.list.restore();
  }).timeout(5000);
});
