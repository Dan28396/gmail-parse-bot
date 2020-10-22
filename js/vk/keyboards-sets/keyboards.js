const Markup = require('node-vk-bot-api/lib/markup')


const subscribedSet = Markup
    .keyboard([[
        Markup.button('Расписание на сегодня', 'primary'),
    ], [
        Markup.button('Расписание на завтра'),
        Markup.button('Расписание на неделю'),
    ], [
        Markup.button('Другое'),
    ],
        [Markup.button('Отписаться', 'negative')]
    ]);

const unsubscribedSet = Markup
    .keyboard([[
        Markup.button('Расписание на сегодня', 'primary'),
    ], [
        Markup.button('Расписание на завтра'),
        Markup.button('Расписание на неделю'),
    ], [
        Markup.button('Другое'),
    ],
        [Markup.button('Подписаться', 'positive')]
    ]);

module.exports = {
    subscribedSet,
    unsubscribedSet
}