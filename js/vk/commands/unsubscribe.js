const {unsubscribed, isNotSubscribed} = require("../phrases/common-phrases");
const {removeSubscriber} = require("../../store");
const {isSubscribed} = require('../../selectors');
const {unsubscribedSet} = require('../keyboards-sets/keyboards')


/**
 * words: [отписаться, unsubscribe]
 *
 * отписывает пользователя от рассылки
 */

const keySet = ['отписаться', 'unsubscribe'];

const command = async (ctx) => {
    let answer;

    if(!await isSubscribed(ctx.message.peer_id)){
        answer = isNotSubscribed();
    } else {
        await removeSubscriber(ctx.message.peer_id).then(() => {
            answer = unsubscribed();
        }, (err) => {
            answer = `Что-то пошло не так, попробуйте позже!`
            console.error(err)
        });
    }

    ctx.reply(answer, null, unsubscribedSet)
}

module.exports = {
    keySet,
    command,
}
