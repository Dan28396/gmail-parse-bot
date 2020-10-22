const fs = require('fs');
const path = require('path');

const {STORE_PATH} =  require('./constants');
const {getStoredSubscribers} = require('./selectors');
const { promisify } = require('./utils');


const writeFile = promisify(fs.writeFile);

const saveMessages = async (messages) => {
  return writeFile(path.join(STORE_PATH, 'messages.json'), JSON.stringify(messages), 'utf-8');
}

const saveSubscriber = async (id) => {
  const subscribersList = await getStoredSubscribers();
  subscribersList.push(id);
  return writeFile(path.join(STORE_PATH, 'subscribers.json'), JSON.stringify(subscribersList), 'utf-8');
}

const removeSubscriber = async (id) => {
  const subscribersList = await getStoredSubscribers();
  subscribersList.splice(subscribersList.indexOf(id), 1);
  return writeFile(path.join(STORE_PATH, 'subscribers.json'), JSON.stringify(subscribersList), 'utf-8');
}

module.exports = {
  saveMessages,
  saveSubscriber,
  removeSubscriber
}
