const VkBot = require('node-vk-bot-api');
const main = require('../index');
const {saveMessages} = require("../store");
const {formatMessage} = require("./utils");
const {VK_TOKEN} = require("../constants");

const today = require('./commands/today');
const tomorrow = require('./commands/tomorrow');
const week = require('./commands/week');
const weekday = require('./commands/weekday');


const bot = new VkBot({token: VK_TOKEN});

bot.command(today.keySet, today.command);
bot.command(tomorrow.keySet, tomorrow.command);
bot.command(week.keySet, week.command);
bot.command(weekday.keySet, weekday.command);

main.updateMessages();

setInterval( main.updateMessages, 1000 * 60 * 15);

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
