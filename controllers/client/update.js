const services = require('../../services');

const update = async (req, res) => {
  const { client } = req;
  const clientUpdate = { id: client.id, ...req.body };
  await services.client.update(clientUpdate);
  return res.status(200).json({ message: 'Cliente atualizado com sucesso' });
};

module.exports = update;
