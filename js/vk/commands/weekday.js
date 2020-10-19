const {formatMessages} = require("../utils");
const {noLessonsAvailable} = require("../phrases/commonPhrases");
const {getStoredMessagesByDay} = require("../../selectors");
const {invertCommands} = require('../utils');
const {getDayByDayOfWeek} = require('../../utils');

const DAY_OF_WEEK = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
}

const commands = {
  MONDAY: ['monday', 'понедельник'],
  TUESDAY: ['tuesday', 'вторник'],
  WEDNESDAY: ['wednesday', 'среда'],
  THURSDAY: ['thursday', 'четверг'],
  FRIDAY: ['friday', 'пятница'],
  SATURDAY: ['saturday', 'суббота'],
}

const invertedCommands = invertCommands(commands);

const keySet = Object.values(commands).flat();

const command = async (ctx) => {
  const dayIndex = DAY_OF_WEEK[invertedCommands[ctx.message.text]];

  console.log(getDayByDayOfWeek(dayIndex));

  const messages = await getStoredMessagesByDay(getDayByDayOfWeek(dayIndex));

  if (!messages.length) {
    return ctx.reply(noLessonsAvailable('выбранный день'));
  }

  const answer = formatMessages(messages);

  ctx.reply(answer);
}

module.exports = {
  keySet,
  command,
}
