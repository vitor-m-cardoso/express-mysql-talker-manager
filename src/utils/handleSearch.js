const filterBySearchTerm = (allTalkers, q) => allTalkers
  .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));

const filterByRateNumber = (allTalkers, rate) => allTalkers
  .filter((talker) => talker.talk.rate === Number(rate));

const filterByWatchedDate = (allTalkers, date) => allTalkers
  .filter((t) => t.talk.watchedAt === date);

const filterByAllParams = (allTalkers, q, rate, date) => {
  const filteredBySearchTerm = filterBySearchTerm(allTalkers, q);
  const filteredByRateNumber = filterByRateNumber(filteredBySearchTerm, rate);
  const filteredData = filterByWatchedDate(filteredByRateNumber, date);
  return filteredData;
};

const filterBySomeParams = (allTalkers, q, rate, date) => {
  let result;
  let filteredData = allTalkers;
  if (q) {
    result = filterBySearchTerm(allTalkers, q);
    filteredData = result;
  }
  if (rate) {
    result = filterByRateNumber(filteredData, rate);
    filteredData = result;
  }
  if (date) {
    result = filterByWatchedDate(filteredData, date);
  }
  return result;
};

const handleSearch = async (allTalkers, { q, rate, date }) => {
  try {
    if (q && rate && date) return filterByAllParams(allTalkers, q, rate, date);
    return filterBySomeParams(allTalkers, q, rate, date);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  handleSearch,
};
