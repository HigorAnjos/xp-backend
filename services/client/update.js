const bcrypt = require('bcrypt');
const { Client } = require('../../database/models');

const update = async (clientUpdate) => {
  const bcrytedPassword = await bcrypt.hash(clientUpdate.password, 10);
  const clientCrypted = {
    ...clientUpdate,
    password: bcrytedPassword,
  };
  await Client.update(clientCrypted, { where: { id: clientCrypted.id } });
};

module.exports = update;
