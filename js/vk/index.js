const VkBot = require('node-vk-bot-api');
const main = require('../index');
const {getNewMessages} = require("../selectors");
const {saveMessages} = require("../store");
const {formatMessage} = require("./utils");
const {VK_TOKEN} = require("../constants");

const bot = new VkBot({ token: VK_TOKEN });

bot.command('Начать', async (ctx) => {
  const messageHistory = await main.getMessageHistory();
  await saveMessages(messageHistory);

  const answer = messageHistory.reduce((message, currLesson) => {
    return message + " " + formatMessage(currLesson);
  }, '');
  ctx.reply(answer);
});

bot.command('/new', async (ctx) => {
  const newMessages = await getNewMessages();

  const answer = newMessages.reduce((message, currLesson) => {
    return message + " " + formatMessage(currLesson);
  }, '');

  if (newMessages.length) {
    ctx.reply(answer);
  }
  ctx.reply('Новых сообщений нет!');
})

bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
});
