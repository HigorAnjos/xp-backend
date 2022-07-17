const services = require('../../services');

const remove = async (req, res) => {
  const { id } = req.client;
  await services.client.remove(id);
  return res.status(200).json({ message: 'Cliente removido com sucesso' });
};

module.exports = remove;
