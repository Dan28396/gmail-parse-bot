const {formatMessages} = require("../utils");
const {subscribed} = require("../phrases/common-phrases");
const Markup = require('node-vk-bot-api/lib/markup');

const {saveSubscriber} = require("../../store")


/**
 * words: [подписаться]
 *
 * выводит расписание на сегодняшний день
 */

const keySet = ['подписаться'];

const command = async (ctx) => {
    let answer;
    await saveSubscriber(ctx.message.peer_id).then(() => {
        answer = subscribed();
    }, (err) => {
        answer = `Что-то пошло не так, попробуйте позже!`
        console.log(err)
    });
    ctx.reply(answer, null, Markup
        .keyboard([[
            Markup.button('qwer', 'primary'),
        ], [
            Markup.button('Рqwer'),
            Markup.button('qwer на неделю'),
        ], [
            Markup.button('Другое'),
        ]
        ]));
}

module.exports = {
    keySet,
    command,
}
