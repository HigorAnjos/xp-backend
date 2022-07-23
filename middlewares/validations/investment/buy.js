const isValidFilds = (req, res, next) => {
  const { code, quantity } = req.body;
  if (!code || !quantity) {
    return res.status(400).json({ message: 'Faltam dados para efetuar a compra do investimento' });
  }
  if (quantity < 0) {
    return res.status(400).json({ message: 'Quantidade deve ser maior que zero' });
  }

  return next();
};

module.exports = isValidFilds;
