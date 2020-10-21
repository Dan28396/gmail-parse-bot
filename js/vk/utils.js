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


const invertCommands = (commands) => {
  return Object.entries(commands).reduce((transformed, currentCommand) => {
    return {...transformed, ...currentCommand[1].reduce((accumulatedObj, currentPhrase) => {
        accumulatedObj[currentPhrase] = currentCommand[0];
        return accumulatedObj;
      }, {})};
  }, {});
};


module.exports = {
  formatMessage,
  formatMessages,
  invertCommands,
}
