require('dotenv').config();
const { db, massivFilmov } = require('./db');
const fs = require('fs');
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const phrase =
  db[massivFilmov[Math.floor(Math.random() * massivFilmov.length)]];
console.log(phrase);
const wordsOnly = phrase.split(' ');

async function getListOfAntsAndSyns(phraise) {
  const response = await fetch(
    `https://dictionaryapi.com/api/v3/references/thesaurus/json/${phraise}?key=a0c8a291-99f2-4382-9b4a-91c91a3e7ac5`
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

async function getTheLineOfNewEpigraf(giveMelist) {
  let newList = [];
  for (let i = 0; i < giveMelist.length; i++) {
    if (giveMelist[i].length > 4) {
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

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Greetings, '));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', async (ctx) => {
  await allInOneDone();
  ctx.replyWithAudio({ source: './speech.ogg' });
});
bot.launch();

const key = process.env.KEY;

async function letsTranslateThePhraseIntoRussian(whatToTranslate) {
  const response = await fetch(
    'https://translate.api.cloud.yandex.net/translate/v2/translate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        folder_id: 'b1gnfe4dlmtcvgp604dj',
        texts: [whatToTranslate],
        targetLanguageCode: 'ru',
      }),
    }
  );
  const rez = await response.json();
  return rez;
}

async function allInOneDone() {
  return new Promise(async (resolve) => {
    let newIpigraf = await getTheLineOfNewEpigraf(wordsOnly);
    console.log(newIpigraf);
    let translatedIpigraf = await letsTranslateThePhraseIntoRussian(newIpigraf);

    const { URLSearchParams } = require('url');
    const params = new URLSearchParams();
    params.append('text', translatedIpigraf.translations[0].text);
    params.append('voice', 'zahar');
    params.append('emotion', 'good');
    params.append('lang', 'ru-RU');
    params.append('speed', '1.0');
    params.append('format', 'oggopus');
    params.append('folderId', process.env.FOLDER_ID);
    async function sintezRechi() {
      fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${key}`,
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
