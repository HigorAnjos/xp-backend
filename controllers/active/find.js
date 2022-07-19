const services = require('../../services');

const find = async (req, res) => {
  const { id: clientId } = req.client;
  const { activeId } = req.params;
  const response = await services.active.find(clientId, activeId);
  return res.status(200).json(response);
};

module.exports = find;
