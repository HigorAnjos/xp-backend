const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/client');
const service = require('../../../../services/client');

const client = {
  email: 'algum@email.com',
  password: '1234',
};

describe('Controller Cliente update', function () {
  it('Deve retornar corretamente status code e objeto token', async function () {
    const MocToken = 'token';
    const req = {};
    const res = {};

    req.client = {
      id: 'algumId',
    };

    req.body = client;

    const clientUpdate = { id: req.client.id, ...req.body };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'update').resolves(MocToken);

    await controller.update(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ token: MocToken })).to.be.true;
    expect(service.update.calledWith(clientUpdate)).to.be.true;

    service.update.restore();
  }).timeout(5000);
});
