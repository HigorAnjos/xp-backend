const { Client, Wallet, sequelize } = require('../../database/models');
const { createToken } = require('../../utils/jwt');

const withOutPassword = async (newClient) => {
  const { password, ...clientWhitoutPassword } = newClient.dataValues;
  return clientWhitoutPassword;
};

const generateToken = async (newClient) => {
  const { id, email } = await withOutPassword(newClient);
  return createToken({ id, email });
};

const transaction = async ({ email, password }) => {
  const result = await sequelize.transaction(async (t) => {
    const newClient = await Client.create({ email, password }, { transaction: t });
    await Wallet.create({ clientId: newClient.id, balance: 0 }, { transaction: t });
    return newClient;
  });

  return result;
};

const create = async ({ email, password }) => {
  const userFound = await Client.findOne({ where: { email } });

  if (userFound) throw { status: 400, message: 'Usuário já cadastrado' };

  try {
    const newClient = await transaction({ email, password });
    return generateToken(newClient);
  } catch (error) {
    throw { status: 400, message: 'Algo deu errado' };
  }
};

// create({ email: 'a@gmail.com', password: '123456' });

module.exports = create;
