const VkBot = require('node-vk-bot-api');
const {VK_TOKEN} = require("../constants");
const commands = require('./commands');
const {onStart, onUpdate} = require("./event-handlers");


const bot = new VkBot({token: VK_TOKEN});

bot.command(commands.today.keySet, commands.today.command);
bot.command(commands.tomorrow.keySet, commands.tomorrow.command);
bot.command(commands.week.keySet, commands.week.command);
bot.command(commands.weekday.keySet, commands.weekday.command);
bot.command(commands.showAllCommands.keySet, commands.showAllCommands.command);
bot.command(commands.afterTomorrow.keySet, commands.afterTomorrow.command);
bot.command(commands.start.keySet, commands.start.command);
bot.command(commands.byDate.keySet, commands.byDate.command);
bot.command(commands.subscribe.keySet, commands.subscribe.command)

bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});

onStart();

setInterval(onUpdate, 1000 * 60 * 15);
