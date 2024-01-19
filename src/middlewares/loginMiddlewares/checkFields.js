const checkFields = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
  const isValidEmail = emailRegex.test(email);

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!isValidEmail) {
    return res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res
      .status(400)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = checkFields;
