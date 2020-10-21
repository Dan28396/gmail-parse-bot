const {greeting} = require("../phrases/common-phrases");
const Markup = require('node-vk-bot-api/lib/markup');

/**
 * words: ['начать']
 *
 * активирует меню
 */

const keySet = ['начать'];

const command = (ctx) => {
  ctx.reply(greeting(), null, Markup
    .keyboard([[
      Markup.button('Расписание на сегодня', 'primary'),
    ], [
      Markup.button('Расписание на завтра'),
      Markup.button('Расписание на неделю'),
    ], [
      Markup.button('Другое'),
    ]
    ]));
}

module.exports = {
  keySet,
  command,
}
