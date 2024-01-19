const checkRate = (rate) => {
  const minOrMaxValue = rate < 1 || rate > 5;
  const isInt = Number.isInteger(rate);
  if (minOrMaxValue || !isInt) {
    return false;
  }
  return true;
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body;
  if (!rate && rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!checkRate(rate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = rateValidation;