const services = require('../../services');

const update = async (req, res) => {
  const { client } = req;
  const clientUpdate = { id: client.id, ...req.body };
  const token = await services.client.update(clientUpdate);
  return res.status(201).json({ token });
};

module.exports = update;
