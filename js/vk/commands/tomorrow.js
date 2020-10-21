const addDay = require('date-fns/addDays');

const {formatMessages} = require("../utils");
const {noLessonsAvailable} = require("../phrases/common-phrases");
const {getStoredMessagesByDay} = require("../../selectors");


/**
 * words: [1, 'tomorrow', 'завтра', 'расписание завтра', 'расписание на завтра', 'пары завтра']
 *
 * выводит расписание на завтрашний день
 */

const keySet = ['tomorrow', 'завтра', 'расписание завтра', 'расписание на завтра', 'пары завтра'];

const command = async (ctx) => {
  const messages = await getStoredMessagesByDay(addDay(Date.now(), 1));

  if (!messages.length) {
    return ctx.reply(noLessonsAvailable('завтрашний день'));
  }

  const answer = formatMessages(messages);

  ctx.reply(answer);
}

module.exports = {
  keySet,
  command,
}
