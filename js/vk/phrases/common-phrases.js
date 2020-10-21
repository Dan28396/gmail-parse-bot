const noLessonsAvailable = (clarification = 'сегодня') => `Запланированных на ${clarification} занятий не найдено`;
const greeting = () => `Привет! Привет!`;
const weekSchedule = () => `Расписание на конкретный день текущей недели:`;
const dateNotValid = () => `Неверный формат даты, пожалуйста, введите новую дату в формате: dd.mm.yyyy`;
const info = () => `Для получения списка занятий на конкретную дату, введите ее в формате: dd.mm.yyyy.\n`;

module.exports = {
  noLessonsAvailable,
  greeting,
  weekSchedule,
  dateNotValid,
  info
}
