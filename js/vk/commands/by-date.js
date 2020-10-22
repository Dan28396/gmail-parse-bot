const {formatMessages} = require("../utils");
const {noLessonsAvailable, dateNotValid} = require("../phrases/common-phrases");
const {getStoredMessagesByDay} = require("../../selectors");


/**
 * date format: dd.mm.yyyy
 *
 * выводит расписание выбранный день
 */
function isDateValid(dateString) {
    const dateRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g;
    return dateString.match(dateRegex) !== null;
}

const keySet = /^[0-9]*\.[0-9]*\.[0-9]*$/g;

const command = async (ctx) => {
    const parsedMessage = ctx.message.text.split('.');
    const messages = await getStoredMessagesByDay(new Date(parsedMessage[2], parsedMessage[1] - 1, parsedMessage[0]));

    if (isDateValid(ctx.message.text)) {
        if (!messages.length) {
            return ctx.reply(noLessonsAvailable(ctx.message.text));
        }
    } else {
        return ctx.reply(dateNotValid());
    }


    const answer = formatMessages(messages);

    ctx.reply(answer);
}

module.exports = {
    keySet,
    command,
}
