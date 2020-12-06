require('dotenv').config();
const { URLSearchParams } = require('url');
const { db, massivFilmov } = require('./db');
const getStringNewEpigraf = require('./getStringNewEpigraf');
const letsTranslateThePhraseIntoRussian = require('./letsTranslateThePhraseIntoRussian');
const yandexFolderId = process.env.FOLDER_ID;

async function getPhraseToSpeech(splittedWords) {
  let newIpigraf = await getStringNewEpigraf(splittedWords);
  let translatedIpigraf = await letsTranslateThePhraseIntoRussian(newIpigraf)
  const params = new URLSearchParams();
  params.append('text', translatedIpigraf.translations[0].text);
  params.append('voice', 'zahar');
  params.append('emotion', 'good');
  params.append('lang', 'ru-RU');
  params.append('speed', '1.0');
  params.append('format', 'oggopus');
  params.append('folderId', yandexFolderId);
  return params;
}

module.exports = getPhraseToSpeech;
