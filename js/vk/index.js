const VkBot = require('node-vk-bot-api');
const main = require('../index');
const {saveMessages} = require("../store");
const {formatMessage} = require("./utils");
const {VK_TOKEN} = require("../constants");

const today = require('./commands/today');
const tomorrow = require('./commands/tomorrow');


const bot = new VkBot({token: VK_TOKEN});

bot.command(today.keySet, today.command);
bot.command(tomorrow.keySet, tomorrow.command);

bot.command('Начать', async (ctx) => {
  const messageHistory = await main.getMessageHistory();
  await saveMessages(messageHistory);

  const answer = messageHistory.reduce((message, currLesson) => {
    return message + " " + formatMessage(currLesson);
  }, '');
  ctx.reply(answer);
});

bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});
