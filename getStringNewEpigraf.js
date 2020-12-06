const getListOfAntsAndSyns = require('./getListOfAntsAndSyns');
const { prepositions } = require('./db');
const regexPunctuation = /\W$/gm; //we have to save the puctuation in the description
const regexClearWord = /[^\W]+/gm; //to trim the word from the punctuation marks to send it to the dictionary

async function getStringNewEpigraf(giveMelist) {
  let newList = [];
  for (let i = 0; i < giveMelist.length; i++) {
    let isThereAPunctuation = '';
    if (giveMelist[i].match(regexPunctuation)) {
      //if there is any punct then we save it to the isThereAPunctuation to use later,
      isThereAPunctuation = giveMelist[i].match(regexPunctuation)[0];
    }
    let clearedWord = giveMelist[i].match(regexClearWord)[0]; //since now we are working with a clear word
    if (!prepositions.includes(clearedWord.toLowerCase())) {
      //to excluse prepositions and some other words from sending to the dictionary
      let antonym = await getListOfAntsAndSyns(clearedWord); //sending the word and saving the response in 'antonym' variable
      if (Array.isArray(antonym)) {
        //checking if there is any antonym or synonym sent to us
        let randomIndex = Math.floor(Math.random() * antonym[0].length); //getting the random index to choose from the word from the list of recieved antonyms/synonyms
        newList.push(antonym[0][randomIndex] + isThereAPunctuation);
      } else {
        newList.push(clearedWord + isThereAPunctuation);
      }
    } else {
      newList.push(clearedWord + isThereAPunctuation);
    }
  }
  return newList.join(' ');
}
module.exports = getStringNewEpigraf;
