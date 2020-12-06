require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const { db, massivFilmov } = require('./db');
const getStringNewEpigraf = require('./getStringNewEpigraf');
const letsTranslateThePhraseIntoRussian = require('./letsTranslateThePhraseIntoRussian');

const yandexFolderId = process.env.FOLDER_ID;
const keyYandex = process.env.KEY_YANDEX;


async function allInOneDone() {
  return new Promise(async (resolve) => {
    let indexFilma = Math.floor(Math.random() * massivFilmov.length);
    const whatPhrase = db[massivFilmov[indexFilma]];
    console.log(whatPhrase);
    whatFilm = massivFilmov[indexFilma];
    const wordsOnly = whatPhrase.split(' ');
    let newIpigraf = await getStringNewEpigraf(wordsOnly);
    let translatedIpigraf = await letsTranslateThePhraseIntoRussian(newIpigraf);

    const { URLSearchParams } = require('url');
    const params = new URLSearchParams();
    params.append('text', translatedIpigraf.translations[0].text);
    params.append('voice', 'zahar');
    params.append('emotion', 'good');
    params.append('lang', 'ru-RU');
    params.append('speed', '1.0');
    params.append('format', 'oggopus');
    params.append('folderId', yandexFolderId);
    async function sintezRechi() {
      fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${keyYandex}`,
        },
        body: params,
      }).then((res) => {
        const dest = fs.createWriteStream('./speech.ogg');
        res.body.pipe(dest);
        dest.on('finish', resolve);
      });
    }
    await sintezRechi();
  });
}
module.exports = allInOneDone;
