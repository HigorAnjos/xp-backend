const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../../services/balance');
const { Wallet } = require('../../../../database/models');

describe('Services withdraw', function () {
  it('Deve retornar novo saldo', async function () {
    const wallet = {
      clientId: 1,
      balance: 100,
      save: sinon.stub().resolves(),
    };

    sinon.stub(Wallet, 'findOne').resolves(wallet);

    const newBalance = await services.withdraw(wallet.clientId, 50);

    expect(newBalance).to.be.equal(50);
    expect(wallet.save.calledOnce).to.be.true;

    Wallet.findOne.restore();
  }).timeout(5000);

  it('Deve retornar erro se saldo insuficiente', async function () {
    const wallet = {
      clientId: 1,
      balance: 50,
    };

    sinon.stub(Wallet, 'findOne').resolves(wallet);

    try {
      await services.withdraw(wallet.clientId, 100);
    } catch (error) {
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Saldo insuficiente');
    }

    Wallet.findOne.restore();
  }).timeout(5000);
});
