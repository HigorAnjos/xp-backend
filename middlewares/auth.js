const jwt = require('../utils/jwt');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw { status: 401, message: 'authorization nao infomado' };

  try {
    const { payload: { id } } = await jwt.verifyToken(authorization);
    req.client = { id };
  } catch (err) {
    return res.status(400).json({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = auth;
