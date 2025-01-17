const Markup = require('node-vk-bot-api/lib/markup');
const {weekSchedule, info} = require("../phrases/common-phrases");

/**
 * words: ['Другое']
 *
 * выводит дополнительное меню
 */

const keySet = ['другое'];

const command = (ctx) =>
  ctx.reply(info() + weekSchedule(), null, Markup
    .keyboard([
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
    ])
    .inline());

module.exports = {
  keySet,
  command,
}
