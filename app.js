require('dotenv').config()
const fs = require('fs')
const { Telegraf } = require('telegraf')
const fetch = require('node-fetch');

const URL = `https://dictionaryapi.com/api/v3/references/thesaurus/json/big?key=a0c8a291-99f2-4382-9b4a-91c91a3e7ac5`
const phrase = 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son'
const wordsOnly = phrase.split(' ')

async function getData(phraise){
  const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${phraise}?key=a0c8a291-99f2-4382-9b4a-91c91a3e7ac5`)
  const rez = await response.json()
  if(rez[0].meta.ants.length){
    return rez[0].meta.ants
  }else{
  return rez[0].meta.syns
  }
}

async function myFunc(giveMelist){
  let newList = []
  for (let i = 0; i < giveMelist.length; i++) {
    if (giveMelist[i].length>4){
    let antonym = await getData(giveMelist[i])
    console.log(antonym[0])
    let randomIndex = Math.floor(Math.random()*(antonym[0].length))
    newList.push(antonym[0][randomIndex])    
    } else{
      newList.push(giveMelist[i])
    }
  };
  // console.log(newList.join(' '))
}

// myFunc(wordsOnly)

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply('Greetings, '))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('text', (ctx) => {

// ctx.reply('Hello, ' + ctx.message.from.first_name)
// })
// bot.launch()
const key = 't1.9euelZrIy83Lx5GVlI6YnZqemZ6Ti-3rnpWajMyclp2TnY6XnpnJipaXkIvl8_cOW1wB-u8HThwo_N3z904JWgH67wdOHCj8.rbYDwcfdZE23zBx0805l0vCBGyP8Ki62rtur7o73ghDIGYFmEVFUeQ0b865_ytBUX96y8MMrkL11NKy3DDX1BQ'

async function howto(){
  const response = await fetch("https://translate.api.cloud.yandex.net/translate/v2/translate",{
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body:JSON.stringify({
    folder_id: "b1gnfe4dlmtcvgp604dj",
    texts: ["How", "Old"],
    targetLanguageCode: "ru"
    })
  })
  const rez = await response.json()
  console.log(rez)
}
// howto()
const { URLSearchParams } = require('url');
const params = new URLSearchParams();
const text = 'Добрый день, у нас новая акция! Пицца Добряк сегодня за полцены, закажите по телефону 222. Уже ждем вашего заказа :) '

params.append('text', text);
params.append('voice', 'zahar');
params.append('emotion', 'good');
params.append('lang', 'ru-RU');
params.append('speed', '1.0');
params.append('format', 'oggopus');
params.append('folderId', 'b1gnfe4dlmtcvgp604dj');

async function sintezRechi(){
  fetch("https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize",
  {
    method: 'POST',
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${key}`
    },
    body: params,})
    // {
  //   folderId: "b1gnfe4dlmtcvgp604dj",
  //   text: "How are you?",
  //   lang: "ru-RU",
  //   format:"oggopus"
  //   }
  // })
  .then(res=>{
  const dest = fs.createWriteStream('./speech.ogg')
  res.body.pipe(dest)
  })
}
sintezRechi()
