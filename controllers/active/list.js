const services = require('../../services');

const list = async (req, res) => {
  const { id } = req.client;
  const clientActives = await services.active.list(id);
  return res.status(200).json(clientActives);
};

module.exports = list;
