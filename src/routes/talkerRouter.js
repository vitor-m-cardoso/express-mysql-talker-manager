const router = require('express').Router();
const {
  getAllTalkers,
  getTalkerById,
  createTalker,
  updateTalker,
  removeTalker,
  patchTalkerRate,
} = require('../utils/talkersData');
const { handleSearch } = require('../utils/handleSearch');

const validateToken = require('../middlewares/talkerMiddlewares/validateToken');
const validateFields = require('../middlewares/talkerMiddlewares/validateFields');
const searchValidation = require('../middlewares/talkerMiddlewares/searchValidation');
const rateValidation = require('../middlewares/talkerMiddlewares/rateValidation');

const { findAll } = require('../db/talkerDB');

const ERROR_MESSAGE = 'Internal server error!';

router.get('/', async (_req, res) => {
  try {
    const result = await getAllTalkers();
    if (result.length > 1) {
      return res.status(200).json(result);
    }
    return res.status(200).send([]);
  } catch (error) {
    return res.status(500).send({ message: ERROR_MESSAGE });
  }
});

router.get('/search', validateToken, searchValidation, async (req, res) => {
  const { query: { q, rate, date } } = req;
  const allTalkers = await getAllTalkers();
  try {
    if (!q && !rate && !date) {
      return res.status(200).json(allTalkers);
    }
    const talkers = await handleSearch(allTalkers, req.query);
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get('/db', async (_req, res) => {
  try {
    const [talkers] = await findAll();
    const result = talkers.map((t) => ({
      name: t.name,
      age: t.age,
      id: t.id,
      talk: { watchedAt: t.talk_watched_at, rate: t.talk_rate },
    }));
    if (result.length > 0) {
      return res.status(200).json(result);
    }
    return res.status(200).send([]);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error!' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await getTalkerById(id);
    if (talker) {
      return res.status(200).json(talker);
    }
    return res.status(404).send({ message: 'Palestrante não encontrado' });
  } catch (error) {
    return res.status(500).send({ message: ERROR_MESSAGE });
  }
});

router.post('/', validateToken, validateFields, async (req, res) => {
  const { body } = req;
  try {
    const newTalker = await createTalker(body);
    return res.status(201).json(newTalker);
  } catch (error) {
    return res.status(500).send({ message: ERROR_MESSAGE });
  }
});

router.put('/:id', validateToken, validateFields, async (req, res) => {
  const { 
    body,
    params: { id },
  } = req;
  try {
    const editedTalker = await updateTalker(id, body);
    if (!editedTalker) {
      return res.status(404).json({ message: 'Palestrante não encontrado' });
    }
    return res.status(200).json(editedTalker);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: ERROR_MESSAGE });
  }
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await removeTalker(id);
    return res.status(204).end();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: ERROR_MESSAGE });
  }
});

router.patch('/rate/:id', validateToken, rateValidation, async (req, res) => {
  const { body: { rate }, params: { id } } = req;
  try {
    await patchTalkerRate(id, rate);
    res.status(204).end();
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error!' });
  }
});

module.exports = router;