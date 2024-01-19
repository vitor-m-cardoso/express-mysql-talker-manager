const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    const isAuthorized = typeof authorization === 'string' && authorization.length === 16;
    if (!isAuthorized) return res.status(401).json({ message: 'Token inválido' });
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = validateToken;
