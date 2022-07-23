const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/active');
const service = require('../../../../services/active');

describe('Controller Active list', function () {
  it('Deve retornar corretamente status code, e lista de ativos do Cliente', async function () {
    const MocActiveClient = {
      id: 1,
      email: 'george@gmail.com',
      products: [
          {
              code: 1,
              name: 'XPBR31',
              salePrice: '94.31',
              quantity: 1,
          },
          {
              code: 1,
              name: 'XPBR31',
              salePrice: '100.00',
              quantity: 1,
          },
          {
              code: 2,
              name: 'VALE3',
              salePrice: '10.00',
              quantity: 1,
          },
      ],
  };
    const req = {};
    const res = {};

    req.client = {
      id: 1,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'list').resolves(MocActiveClient);

    await controller.list(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(MocActiveClient)).to.be.true;
    expect(service.list.calledWith(req.client.id)).to.be.true;

    service.list.restore();
  }).timeout(5000);
});
