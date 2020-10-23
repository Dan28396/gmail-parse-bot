const {updateMessages, scheduleDailyMailing} = require('../index');

const onStart = () => {
  updateMessages();
}

const onUpdate = () => {
  updateMessages();
}

const startSendingDailyMessages = (bot) => {
  scheduleDailyMailing(bot);
}

module.exports = {
  onStart,
  onUpdate,
  startSendingDailyMessages
}
