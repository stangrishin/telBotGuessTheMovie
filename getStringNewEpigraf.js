const getListOfAntsAndSyns = require('./getListOfAntsAndSyns');
const { prepositions } = require('./db');

async function getStringNewEpigraf(giveMelist) {
  let newList = [];
  for (let i = 0; i < giveMelist.length; i++) {
    if (!prepositions.includes(giveMelist[i].toLowerCase())) {
      let antonym = await getListOfAntsAndSyns(giveMelist[i]);
      if (Array.isArray(antonym)) {
        let randomIndex = Math.floor(Math.random() * antonym[0].length);
        newList.push(antonym[0][randomIndex]);
      } else {
        newList.push(giveMelist[i]);
      }
    } else {
      newList.push(giveMelist[i]);
    }
  }
  return newList.join(' ');
}
module.exports = getStringNewEpigraf;
