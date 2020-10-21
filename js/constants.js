const path = require('path');

const STORE_PATH = path.join(__dirname, '../public/store/');

const REGEXP = {
  ZOOM_LINK: /https:\/\/itmo.zoom.us\/j\/[\w?=]*/,
  SUBJECT: /по дисциплине (.*?), преподаватель/,
  LESSON_TYPE: /Информируем Вас, что (.*?) по дисциплине/,
  TEACHER_NAME: /преподаватель (.*?), состоится/,
  DATE: /, состоится (.*?) в дистанционном/,
  PASSWORD: /пароль: (\d+)/,
  CONFERENCE_ID: /идентификатор конференции: (\d+)/,
}


const VK_TOKEN = '95cdfb60cf0cd1915d9f202906aa4077011fafdc73b64a3fbf207d39284e5093b137e196105ee32703066';


const TIME_ZONE = 3;


module.exports = {
  REGEXP,
  TIME_ZONE,
  VK_TOKEN,
  STORE_PATH,
}
