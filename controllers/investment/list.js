const services = require('../../services');

const list = async (_req, res) => {
  const investiments = await services.investiment.list();
  return res.status(200).json(investiments);
};

module.exports = list;
