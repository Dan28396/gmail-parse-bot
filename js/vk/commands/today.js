const {formatMessages} = require("../utils");
const {noLessonsAvailable} = require("../phrases/commonPhrases");
const {getStoredMessagesByDay} = require("../../selectors");


/**
 * words: [0, 'сегодня', 'today', 'пары сегодня', 'расписание сегодня']
 *
 * выводит расписание на сегодняшний день
 */

const keySet = ['0', 'сегодня', 'today', 'пары сегодня', 'расписание сегодня'];

const command = async (ctx) => {
  const messages = await getStoredMessagesByDay(Date.now());

  if (!messages.length) {
    return ctx.reply(noLessonsAvailable('сегоднящний день'));
  }

  const answer = formatMessages(messages);

  ctx.reply(answer);
}

module.exports = {
  keySet,
  command,
}
