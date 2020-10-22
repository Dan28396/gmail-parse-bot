const addDay = require('date-fns/addDays');

const {formatMessages} = require("../utils");
const {noLessonsAvailable} = require("../phrases/common-phrases");
const {getStoredMessagesByDay} = require("../../selectors");


/**
 * words: ['after tomorrow', 'послезавтра', 'расписание послезавтра', 'расписание на послезавтра', 'пары послезавтра']
 *
 * выводит расписание на послезавтра
 */

const keySet = ['after tomorrow', 'послезавтра', 'расписание послезавтра', 'расписание на послезавтра', 'пары послезавтра'];

const command = async (ctx) => {
  const messages = await getStoredMessagesByDay(addDay(Date.now(), 2));

  if (!messages.length) {
    return ctx.reply(noLessonsAvailable('послезавтра'));
  }

  const answer = formatMessages(messages);

  ctx.reply(answer);
}

module.exports = {
  keySet,
  command,
}
