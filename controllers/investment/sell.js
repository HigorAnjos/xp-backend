const services = require('../../services');

const sell = async (req, res) => {
  const { id: clientId } = req.client;
  const { code, quantity } = req.body;

  await services.investiment.sell(clientId, code, quantity);

  return res.status(201).json({ message: 'Venda efetuada com sucesso' });
};

module.exports = sell;
