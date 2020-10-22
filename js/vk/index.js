const VkBot = require('node-vk-bot-api');
const {VK_TOKEN} = require("../constants");
const {commands, useBotCommands} = require('./commands');
const {onStart, onUpdate} = require("./event-handlers");


const bot = new VkBot({token: VK_TOKEN});

useBotCommands(bot, commands);

bot.startPolling((err) => {
    if (err) {
        console.error(err);
    }
});

onStart();

setInterval(onUpdate, 1000 * 60 * 15);
