require('dotenv').config();
const { Telegraf } = require('telegraf');
const telegramBotToken = process.env.BOT_TOKEN;
const { db, massivFilmov } = require('./db');
const { allInOneDone } = require('./allInOneFunction');
const bot = new Telegraf(telegramBotToken);
let whatFilm = '';

bot.start((ctx) => ctx.reply('Greetings, '));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.command('davaj', async (ctx) => {
  let indexFilma = Math.floor(Math.random() * massivFilmov.length);
  whatFilm = massivFilmov[indexFilma];
  const whatPhrase = db[massivFilmov[indexFilma]];
  console.log('in the bot.js ', whatFilm);
  const wordsOnly = whatPhrase.split(' ');
  await allInOneDone(wordsOnly);
  ctx.replyWithAudio({ source: './speech.ogg' });
});
bot.on('text', (ctx) => {
  if (ctx.message.text === whatFilm) {
    ctx.reply('GREAT, GREAT');
  }
});
bot.launch();
