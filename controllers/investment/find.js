const services = require('../../services');

const find = async (req, res) => {
  const { id } = req.params;
  const investiment = await services.investiment.find(id);
  return res.status(200).json(investiment);
};

module.exports = find;
