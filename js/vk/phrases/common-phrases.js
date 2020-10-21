const noLessonsAvailable = (clarification = 'сегодня') => `Запланированных на ${clarification} занятий не найдено`;
const greeting = () => `Привет! Привет!`;
const weekSchedule = () => `Расписание на конкретный день текущей недели:`;

module.exports = {
  noLessonsAvailable,
  greeting,
  weekSchedule
}
