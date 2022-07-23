const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../../../../controllers/client');
const service = require('../../../../services/client');

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
