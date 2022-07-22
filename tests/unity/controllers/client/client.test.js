/* eslint-disable mocha/max-top-level-suites */
/* eslint-disable no-unused-expressions */
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
  });
});

describe('Controller Cliente login', function () {
  it('Deve retornar corretamente status code, e objeto com o token', async function () {
    const MocToken = 'token';
    const req = {};
    const res = {};

    req.body = client;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'login').resolves(MocToken);

    await controller.login(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ token: MocToken })).to.be.true;

    service.login.restore();
  });
});

describe('Controller Cliente remove', function () {
  it('Deve retornar corretamente status code, e objeto com mensagem de sucesso', async function () {
    const req = {};
    const res = {};

    req.client = {
      id: 'algumId',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(service, 'remove').resolves();

    await controller.remove(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Cliente removido com sucesso' })).to.be.true;

    service.remove.restore();
  }).timeout(5000);
});

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
