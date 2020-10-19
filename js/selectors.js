const fs = require('fs');
const path = require('path')
const {STORE_PATH} = require("./constants");


const { promisify, difference } = require('./utils');

const readFile = promisify(fs.readFile);


const getStoredMessages = async () =>  {
  try {
    const messages = await readFile(path.join(STORE_PATH, 'messages.txt'), 'utf-8');
    return JSON.parse(messages);
  } catch (e) {
    return [];
  }
}


const getMessagesByProps = (messages, props) => {
  return messages.filter((message) => {
    return Object.entries(props).every(([key, value]) => {
      return (message[key] === value);
    });
  })
};


getMessagesByDate = (messages, date) => {

};


const getStoredMessagesByProps = async (props) => {
  const storedMessages = await getStoredMessages();
  return getMessagesByProps(storedMessages, props);
};


const getNewMessages = async (messages) => {
  const storedMessages = await getStoredMessages();

  return difference(messages, storedMessages, 'id');
}


module.exports = {
  getStoredMessages,
  getStoredMessagesByProps,
  getNewMessages
}

