const isValid = (req, _res, next) => {
  const { balance } = req.body;

  if (balance <= 0) {
    throw { status: 400, message: 'Saldo inválido' };
  }

  next();
};

module.exports = { isValid };
