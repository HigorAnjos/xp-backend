const bcrypt = require('bcrypt');
const { Client } = require('../../database/models');
const jwt = require('../../utils/jwt');

const withOutPassword = async (clientFound) => {
  const { password, ...clientWhitoutPassword } = clientFound.dataValues;
  return clientWhitoutPassword;
};

const isValidPassword = async (clientFound, informedPassword) => {
  const isCorret = await bcrypt.compare(informedPassword, clientFound.dataValues.password);
  if (!isCorret) {
    throw { status: 400, message: 'Senha incorreta' };
  }
};

const login = async (client) => {
  const clientFound = await Client.findOne({ where: { email: client.email } });
  if (!clientFound) {
    throw { status: 404, message: 'Cliente nao encontrado' };
  }
  await isValidPassword(clientFound, client.password);
  const token = await jwt.createToken(await withOutPassword(clientFound));

  return token;
};

module.exports = login;
