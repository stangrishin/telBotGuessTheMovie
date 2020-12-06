require('dotenv').config();
const { Telegraf } = require('telegraf');
const telegramBotToken = process.env.BOT_TOKEN;
const allInOneDone = require('./app')
let whatFilm = '';
const bot = new Telegraf(telegramBotToken);
bot.start((ctx) => ctx.reply('Greetings, '));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.command('davaj', async (ctx) => {
  await allInOneDone();
  ctx.replyWithAudio({ source: './speech.ogg' });
});
bot.on('text', (ctx) => {
  if (ctx.message.text === whatFilm) {
    ctx.reply('GREAT, GREAT');
  }
});
bot.launch();
