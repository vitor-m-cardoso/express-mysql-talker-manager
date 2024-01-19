const fs = require('fs').promises;
const { join } = require('path');

const path = join(__dirname, '../talker.json');

const { readFile, writeFile } = fs;

const readTalkerFile = async () => {
  const file = await readFile(path);
  return file;
};

const getAllTalkers = async () => {
  try {
    const result = JSON.parse(await readTalkerFile());
    return result;
  } catch (error) {
    return error.message;
  }
};

const getTalkerById = async (id) => {
  try {
    const allTalkers = await getAllTalkers();
    const talker = allTalkers.find((t) => t.id === Number(id));
    return talker;
  } catch (error) {
    return error.message;
  }
};

const writeTalkerData = async (data) => {
  await writeFile(path, JSON.stringify(data));
};

const createTalker = async (data) => {
  try {
    const talkerData = JSON.parse(await readTalkerFile());
    const newTalker = {
      id: talkerData.length + 1,
      ...data,
    };
    talkerData.push(newTalker);
    await writeTalkerData(talkerData);
    return newTalker;
  } catch (error) {
    return error.message;
  }
};

const updateTalker = async (id, data) => {
  const { name, age, talk } = data;
  try {
    const talkerData = JSON.parse(await readTalkerFile());
    const foundTalker = talkerData.find((t) => t.id === Number(id));

    if (!foundTalker) return;

    foundTalker.name = name;
    foundTalker.age = age;
    foundTalker.talk = talk;
    await writeTalkerData(talkerData);
    return foundTalker;
  } catch (error) {
    return error.message;
  }
};

const removeTalker = async (id) => {
  try {
    const talkers = JSON.parse(await readTalkerFile());
    const arrayPosition = talkers.findIndex((t) => t.id === Number(id));
    if (arrayPosition === -1) return;
    talkers.splice(arrayPosition, 1);
    await writeTalkerData(talkers);
  } catch (error) {
    return error.message;
  }
};

const patchTalkerRate = async (id, rate) => {
  try {
    const talkerData = JSON.parse(await readTalkerFile());
    const foundTalker = talkerData.find((t) => t.id === Number(id));
    foundTalker.talk.rate = rate;
    await writeTalkerData(talkerData);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  updateTalker,
  removeTalker,
  patchTalkerRate,
};
