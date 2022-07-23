const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/client');
const service = require('../../../../services/client');

const client = {
  email: 'algum@email.com',
  password: '1234',
};

describe('Controller Cliente create', function () {
  // const MocToken = 'token';
  // const req = {};
  // const res = {};

  // before(function () {
  //   req.body = {
  //     email: 'algum@email.com',
  //     password: '1234',
  //   };

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(service, 'create').resolves(MocToken);
  // });

  // after(function () {
  //   service.create.restore();
  // });

  it('Deve retornar corretamente status code, e objeto com o token', async function () {
    const MocToken = 'token';
    const req = {};
    const res = {};

    req.body = client;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'create').resolves(MocToken);

    await controller.create(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ token: MocToken })).to.be.true;

    service.create.restore();
  }).timeout(5000);
});
