const formatMessage = (lessonData) => {
  return (
    `Предмет: ${lessonData.subject}
Тип занятия: ${lessonData.lessonType}
Дата и время проведения: ${lessonData.lessonDate}
Ссылка в zoom: ${lessonData.zoomLink}

`
  );
};


const formatMessages = (messages) => messages.reduce((message, currLesson) => {
  return message + " " + formatMessage(currLesson);
}, '');


module.exports = {
  formatMessage,
  formatMessages
}
