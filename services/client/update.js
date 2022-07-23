const bcrypt = require('bcrypt');
const { Client } = require('../../database/models');
const jwt = require('../../utils/jwt');

const withOutPassword = async (clientFound) => {
  const { password, ...clientWhitoutPassword } = clientFound;
  return clientWhitoutPassword;
};

const update = async (clientUpdate) => {
  const bcrytedPassword = await bcrypt.hash(clientUpdate.password, 10);
  const clientCrypted = {
    ...clientUpdate,
    password: bcrytedPassword,
  };
  await Client.update(clientCrypted, { where: { id: clientCrypted.id } });

  return jwt.createToken(await withOutPassword(clientCrypted));
};

module.exports = update;
