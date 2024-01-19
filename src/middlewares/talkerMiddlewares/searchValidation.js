const checkRate = (rate) => {
  const num = Number(rate);
  return Number.isInteger(num);
};

const rateValidation = (req, res, next) => {
  const { query: { rate } } = req;
  if (rate && (rate < 1 || rate > 5 || !checkRate(rate))) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

const checkDate = (date) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const isValid = dateRegex.test(date);
  if (!isValid) return false;
  return true;
};

const dateValidation = (req, res, next) => {
  const { query: { date } } = req;
  if (date && !checkDate(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = [
  rateValidation,
  dateValidation,
];