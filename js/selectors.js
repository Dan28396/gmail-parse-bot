const fs = require('fs');
const path = require('path');
const isSameDay = require('date-fns/isSameDay');
const isSameWeek = require('date-fns/isSameWeek');
const parse = require('date-fns/parseISO');

const {STORE_PATH} = require('./constants');
const {promisify, difference} = require('./utils');


const readFile = promisify(fs.readFile);

const getStoredMessages = async () => {
  try {
    const messages = await readFile(path.join(STORE_PATH, 'messages.json'), 'utf-8');
    const parsedMessages = JSON.parse(messages);

    parsedMessages.forEach(
      message => message.lessonDate = parse(message.lessonDate)
    );

    return parsedMessages;
  } catch (e) {
    return [];
  }
}

const getStoredSubscribers = async () => {
  try {
    const subscribers = await readFile(path.join(STORE_PATH, 'subscribers.json'), 'utf-8');
    return JSON.parse(subscribers);
  } catch (e) {
    return [];
  }
}

const isSubscribed = async (userId) => {
  const subscribers = await getStoredSubscribers();
  return subscribers.includes(userId);
}

const getMessagesByProps = (messages, props) => {
  return messages.filter((message) => {
    return Object.entries(props).every(([key, value]) => {
      return (message[key] === value);
    });
  })
};


const getMessagesByDay = (messages, date) => {
  return messages.filter((message) => {
    return isSameDay(message.lessonDate, date);
  });
};


const getStoredMessagesByDay = async (day) => {
  const storedMessages = await getStoredMessages();
  return getMessagesByDay(storedMessages, day);
}


const getMessagesByWeek = (messages, date) => {
  return messages.filter((message) => {
    return isSameWeek(message.lessonDate, date, {weekStartsOn: 1});
  });
};


const getStoredMessagesByWeek = async (day) => {
  const storedMessages = await getStoredMessages();
  return getMessagesByWeek(storedMessages, day);
}


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
  getStoredSubscribers,
  isSubscribed,
  getStoredMessagesByProps,
  getNewMessages,
  getStoredMessagesByDay,
  getStoredMessagesByWeek,
}

