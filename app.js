require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');
const getPhraseToSpeech = require('./getPhraseToSpeech');

const keyYandex = process.env.KEY_YANDEX;

async function allInOneDone(putWordsHere) {
  return new Promise(async (resolve) => {
    async function sintezSpeech(keyForYandex, whichParams) {
      fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${keyForYandex}`,
        },
        body: whichParams,
      }).then((res) => {
        const dest = fs.createWriteStream('./speech.ogg');
        res.body.pipe(dest);
        dest.on('finish', resolve);
      });
    }
    await sintezSpeech(keyYandex, await getPhraseToSpeech(putWordsHere));
  });
}
module.exports = { allInOneDone };
