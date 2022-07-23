const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../../services/investment');
const { Wallet, Product } = require('../../../../database/models');

describe('Services investmente buy', function () {
  it('Funcao iCanBuy deve lancar execao quando saldo e insuficiente', async function () {
    const quantity = 1;
    const price = 10.00;
    const balance = 0;
    try {
      await services.buy.iCanBuy(quantity, price, balance);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Saldo insuficiente');
    }
  });
  it('Funcao iCanBuy deve retornar nada quando saldo e suficiente', async function () {
    const quantity = 1;
    const price = 10.00;
    const balance = 10.00;

    try {
      const result = await services.buy.iCanBuy(quantity, price, balance);
      expect(result).to.be.equal(undefined);
    } catch (error) {
      // falhar o teste
      expect(error).to.be.equal(undefined);
    }
  });

  it('Funcao getDbWallet deve lancar execao quando saldo for zero', async function () {
    const clientId = 1;
    const t = sinon.stub();

    sinon.stub(Wallet, 'findByPk').resolves({ dataValues: { balance: 0 } });

    try {
      await services.buy.getDbWallet(clientId, t);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Saldo insuficiente');
    }
    Wallet.findByPk.restore();
  });

  it('Funcao getDbWallet deve retornar objeto quando saldo for maior que zero', async function () {
    const clientId = 1;
    const t = sinon.stub();

    sinon.stub(Wallet, 'findByPk').resolves({ dataValues: { balance: 10.00 } });

    try {
      const result = await services.buy.getDbWallet(clientId, t);
      expect(result).to.be.an('object');
      expect(result.balance).to.be.equal(10.00);
    } catch (error) {
      // falhar o teste
      expect(error).to.be.equal(undefined);
    }
    Wallet.findByPk.restore();
  });

  it('Funcao getDbProduct deve lancar execao quando produto nao existir', async function () {
    const code = 1;
    const t = sinon.stub();

    sinon.stub(Product, 'findByPk').resolves(null);

    try {
      await services.buy.getDbProduct(code, t);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Produto não encontrado');
    }
    Product.findByPk.restore();
  });

  it('Funcao getDbProduct deve lancar execao quando quantidade for zero', async function () {
    const code = 1;
    const t = sinon.stub();

    sinon.stub(Product, 'findByPk').resolves({ dataValues: { quantity: 0 } });

    try {
      await services.buy.getDbProduct(code, t);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Produto esgotado');
    }
    Product.findByPk.restore();
  });

  it('Funcao getDbProduct retornar objeto quando quantidade for maior que zero', async function () {
    const code = 1;
    const t = sinon.stub();

    sinon.stub(Product, 'findByPk').resolves({ dataValues: { quantity: 10.00 } });

    try {
      const result = await services.buy.getDbProduct(code, t);
      expect(result).to.be.an('object');
      expect(result.quantity).to.be.equal(10.00);
    } catch (error) {
      // falhar o teste
      expect(error).to.be.equal(undefined);
    }
    Product.findByPk.restore();
  });
});
