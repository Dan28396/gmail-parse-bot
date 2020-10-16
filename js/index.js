const {google} = require('googleapis');
const fs = require('fs');
const path = require('path')

const {REGEXP} = require('./constants');
const service = path.join(__dirname, '../public/service/');
const {get, parseDate, decodeMessage} = require("./utils");

const getCredentials = function () {
  const token = fs.readFileSync(service + 'token.json', 'utf-8');

  let credentials = fs.readFileSync(service + 'credentials.json', 'utf-8');
  credentials = JSON.parse(credentials);

  const {
    client_secret,
    client_id,
    redirect_uris
  } = credentials.web;

  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  auth.setCredentials(JSON.parse(token));

  return auth
}


const getMessagesText = function (messagesArray) {
  messagesArray.forEach((id) => {
    messages.get({
      userId: 'me',
      id: id,
      format: 'full',
    }, (err, res) => {
      if (err) {
        return console.log('The API returned an error: ' + err);
      }

      const messageDate = res.data.internalDate.substr(0, 10);
      const messageText = res.data.payload.parts.find((part) => part.mimeType === 'text/html').body.data;

      parseMessage(messageText, messageDate);
    })
  })
}


const getMessageHistory = function () {
  messages.list({
    userId: 'me',
    labelIds: ['Label_1421478860309557188']
  }, (err, res) => {
    if (err) {
      return console.log('The API returned an error: ' + err);
    }

    const messagesArray = res.data.messages
      .reverse()
      .map((obj) => obj.id);

    getMessagesText(messagesArray)
  });
}


const parseMessage = function (text) {
  const decodedText = decodeMessage(text);

  return {
    lessonType: get(decodedText.match(REGEXP.LESSON_TYPE), [1]),
    zoomLink: get(decodedText.match(REGEXP.ZOOM_LINK), [0]),
    subject: get(decodedText.match(REGEXP.SUBJECT), [1]),
    teacherName: get(decodedText.match(REGEXP.TEACHER_NAME), [1]),
    lessonDate: parseDate(get(decodedText.match(REGEXP.DATE), [1])),
    password: get(decodedText.match(REGEXP.PASSWORD), [1]),
    conferenceId: get(decodedText.match(REGEXP.CONFERENCE_ID), [1]),
  };
}

const auth = getCredentials();
const messages = google.gmail({version: 'v1', auth}).users.messages;

module.exports = {
  getCredentials,
  getMessagesText,
  getMessageHistory,
  parseMessage
}
