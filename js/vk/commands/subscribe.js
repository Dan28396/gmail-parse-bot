const {subscribed, alreadySubscribed} = require("../phrases/common-phrases");
const {saveSubscriber} = require("../../store");
const {isSubscribed} = require('../../selectors');
const {subscribedSet} = require('../keyboards-sets/keyboards')


/**
 * words: [подписаться, subscribe]
 *
 * подписывает пользователя на ежедневную подписку
 */

const keySet = ['подписаться', 'subscribe'];

const command = async (ctx) => {
    let answer;

    if(await isSubscribed(ctx.message.peer_id)){
        answer = alreadySubscribed();
    } else {
        await saveSubscriber(ctx.message.peer_id).then(() => {
            answer = subscribed();
        }, (err) => {
            answer = `Что-то пошло не так, попробуйте позже!`;
            console.error(err);
        });
    }

    ctx.reply(answer, null, subscribedSet);
}

module.exports = {
    keySet,
    command,
}
