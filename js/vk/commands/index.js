const commands = [
    today = require('./today'),
    tomorrow = require('./tomorrow'),
    week = require('./week'),
    weekday = require('./weekday'),
    showAllCommands = require('./show-all-commands'),
    afterTomorrow = require('./after-tomorrow'),
    start = require('./start'),
    subscribe = require('./subscribe'),
    unsubscribe = require('./unsubscribe'),
    byDate = require('./by-date')
]

const useBotCommands = (bot, commands) => {
    commands.forEach((com) => {
        bot.command(com.keySet, com.command)
    })
}


module.exports = {
    commands,
    useBotCommands
}
