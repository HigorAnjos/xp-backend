const services = require('../../services');

const create = async (req, res) => {
  const newClient = req.body;
  console.log('create user', newClient);
  const token = await services.client.create(newClient);
  return res.status(201).json({ token });
};

module.exports = create;
