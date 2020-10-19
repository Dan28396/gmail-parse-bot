const dateFnsParse = require('date-fns/parse');
const startOfWeek = require('date-fns/startOfWeek');
const addWeeks = require('date-fns/addWeeks');
const addDays = require('date-fns/addDays');
const difference = require('lodash.differenceby');


const noop = () => {
};


const get = (obj, path, defaultValue) => {
  return path.reduce((currentObj, currentPath) => {
    if (currentObj && currentObj[currentPath] !== undefined) {
      return currentObj[currentPath]
    }
    return defaultValue;
  }, obj);
};


const parseDate = (dateString, pattern = 'dd.MM.y HH:mm') => {
  return dateFnsParse(dateString, pattern, Date.now());
}


const getDayByDayOfWeek = (index, isNextWeek = false) => {
  if (index > 6) {
    throw new Error('Index should be:(0 <= index < 7)');
  }

  const monday = isNextWeek ?
    startOfWeek(addWeeks(Date.now(), 1), {weekStartsOn: 1}) :
    startOfWeek(Date.now(), {weekStartsOn: 1});

  return addDays(monday, index);
}


const decodeMessage = (text) => {
  return Buffer
    .from(text, "base64")
    .toString('utf-8')
    .replace(/[\n\r]/g, '');
}


const promisify = (func) => {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function resolvePromise(err, ...args) {
        if (err) {
          reject(err);
        } else if (args.length < 2) {
          resolve(args[0]);
        } else {
          resolve(args);
        }
      });

      func.apply(null, args);
    });
  }
}

module.exports = {
  noop,
  get,
  parseDate,
  decodeMessage,
  promisify,
  difference,
  getDayByDayOfWeek,
}
