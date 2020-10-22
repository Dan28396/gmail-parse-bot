const {formatMessages} = require("../utils");
const {noLessonsAvailable} = require("../phrases/common-phrases");
const {getStoredMessagesByWeek} = require("../../selectors");


/**
 * words: ['week', 'неделя', 'расписание на неделю']
 *
 * выводит расписание на текущую неделю
 */

const keySet = ['week', 'неделя', 'расписание на неделю'];

const command = async (ctx) => {
  const messages = await getStoredMessagesByWeek(Date.now());

  if (!messages.length) {
    return ctx.reply(noLessonsAvailable('эту неделю'));
  }

  const answer = formatMessages(messages);

  ctx.reply(answer);
}

module.exports = {
  keySet,
  command,
}
