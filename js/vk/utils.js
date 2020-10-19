const formatMessage = (lessonData) => {
  return (
    `Предмет: ${lessonData.subject}
Тип занятия: ${lessonData.lessonType}
Дата и время проведения: ${lessonData.lessonDate}
Ссылка в zoom: ${lessonData.zoomLink}

`
  );
};

module.exports = {
  formatMessage,
}
