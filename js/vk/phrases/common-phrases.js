const noLessonsAvailable = (clarification = 'сегодня') => `Запланированных на ${clarification} занятий не найдено`;
const greeting = () => `Привет! Привет!`;
const weekSchedule = () => `Расписание на конкретный день текущей недели:`;
const dateNotValid = () => `Неверный формат даты, пожалуйста, введите новую дату в формате: dd.mm.yyyy`;

module.exports = {
  noLessonsAvailable,
  greeting,
  weekSchedule,
  dateNotValid
}
