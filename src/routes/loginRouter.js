const router = require('express').Router();
const generateToken = require('../utils/generateToken');

const checkFields = require('../middlewares/loginMiddlewares/checkFields');

router.post('/', checkFields, (req, res) => {
  try {
    const token = generateToken();
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
});

module.exports = router;