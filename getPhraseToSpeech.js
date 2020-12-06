require('dotenv').config();
const { URLSearchParams } = require('url');
const getStringNewEpigraf = require('./getStringNewEpigraf');
const letsTranslateThePhraseIntoRussian = require('./letsTranslateThePhraseIntoRussian');
const yandexFolderId = process.env.FOLDER_ID;

async function getPhraseToSpeech(splittedWords) {
  let newIpigraf = await getStringNewEpigraf(splittedWords);
  console.log(newIpigraf);
  let translatedIpigraf = await letsTranslateThePhraseIntoRussian(newIpigraf);
  const params = new URLSearchParams();
  params.append('text', translatedIpigraf.translations[0].text);
  params.append('voice', 'omazh');
  params.append('emotion', 'evil');
  params.append('lang', 'ru-RU');
  params.append('speed', '1.0');
  params.append('format', 'oggopus');
  params.append('folderId', yandexFolderId);
  return params;
}

module.exports = getPhraseToSpeech;
