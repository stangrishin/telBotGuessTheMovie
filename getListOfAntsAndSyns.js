require('dotenv').config();
const fetch = require('node-fetch');
const dictToken = process.env.SYN_DIC_TOKEN;

async function getListOfAntsAndSyns(phraise) {
  const response = await fetch(
    `https://dictionaryapi.com/api/v3/references/thesaurus/json/${phraise}?key=${dictToken}`
  );
  const rez = await response.json();
  if (rez[0]) {
    if (rez[0]?.meta?.ants?.length) {
      return rez[0].meta.ants;
    } else if (rez[0]?.meta?.syns?.length) {
      return rez[0].meta.syns;
    }
  }
}

module.exports = getListOfAntsAndSyns;
