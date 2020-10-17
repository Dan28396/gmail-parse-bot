const REGEXP = {
  ZOOM_LINK: /https:\/\/itmo.zoom.us\/j\/[\w?=]*/,
  SUBJECT: /по дисциплине (.*?), преподаватель/,
  LESSON_TYPE: /Информируем Вас, что (.*?) по дисциплине/,
  TEACHER_NAME: /преподаватель (.*?), состоится/,
  DATE: /, состоится (.*?) в дистанционном/,
  PASSWORD: /пароль: (\d+)/,
  CONFERENCE_ID: /идентификатор конференции: (\d+)/,
}


const TIME_ZONE = 3;


module.exports = {
  REGEXP,
  TIME_ZONE
}