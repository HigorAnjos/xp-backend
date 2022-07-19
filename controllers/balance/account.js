const services = require('../../services');

const account = async (req, res) => {
  const { id } = req.client;
  const getAccount = await services.balance.account(id);

  return res.status(200).json(getAccount);
};

module.exports = account;
