require('dotenv').config();
const fetch = require('node-fetch');
const keyYandex = process.env.KEY_YANDEX;
const yandexFolderId = process.env.FOLDER_ID;

async function letsTranslateThePhraseIntoRussian(whatToTranslate) {
  const response = await fetch(
    'https://translate.api.cloud.yandex.net/translate/v2/translate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keyYandex}`,
      },
      body: JSON.stringify({
        folder_id: yandexFolderId,
        texts: [whatToTranslate],
        targetLanguageCode: 'ru',
      }),
    }
  );
  const rez = await response.json();
  return rez;
}
module.exports = letsTranslateThePhraseIntoRussian;
