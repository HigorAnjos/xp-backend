const { Wallet } = require('../../database/models');

const account = (clientId) => Wallet.findOne({ where: { clientId } });

module.exports = account;
