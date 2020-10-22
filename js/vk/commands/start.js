const {greeting} = require("../phrases/common-phrases");
const {isSubscribed} = require('../../selectors');
const {unsubscribedSet, subscribedSet} = require('../keyboards-sets/keyboards');

/**
 * words: ['начать', 'старт', 'start']
 *
 * активирует меню
 */

const keySet = ['начать', 'старт', 'start'];

const command = async (ctx) => {
    const keyboard = await isSubscribed(ctx.message.peer_id) ? subscribedSet : unsubscribedSet;
    ctx.reply(greeting(), null, keyboard);
}

module.exports = {
    keySet,
    command,
}
