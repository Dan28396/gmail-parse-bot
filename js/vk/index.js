const VkBot = require('node-vk-bot-api');
const {VK_TOKEN} = require("../constants");

const today = require('./commands/today');
const tomorrow = require('./commands/tomorrow');
const week = require('./commands/week');
const weekday = require('./commands/weekday');
const {onStart, onUpdate} = require("./event-handlers");
const showAllCommands = require('./commands/show-all-commands');
const afterTomorrow = require('./commands/after-tomorrow');
const start = require('./commands/start');
const subsctibe = require('./commands/subscribe')
const byDate = require('./commands/by-date')

const bot = new VkBot({token: VK_TOKEN});

bot.command(today.keySet, today.command);
bot.command(tomorrow.keySet, tomorrow.command);
bot.command(week.keySet, week.command);
bot.command(weekday.keySet, weekday.command);
bot.command(showAllCommands.keySet, showAllCommands.command);
bot.command(afterTomorrow.keySet, afterTomorrow.command);
bot.command(start.keySet, start.command);
bot.command(byDate.keySet, byDate.command);
bot.command(subsctibe.keySet, subsctibe.command)

bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});

onStart();

setInterval(onUpdate, 1000 * 60 * 15);
