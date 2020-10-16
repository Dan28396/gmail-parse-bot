const dateFnsParse = require('date-fns/parse');
const addHours = require('date-fns/addHours');
const {TIME_ZONE} = require("./constants");


const noop = () => {};


const get = (obj, path, defaultValue) => {
  return path.reduce((currentObj, currentPath) => {
    if (currentObj && currentObj[currentPath] !== undefined) {
      return currentObj[currentPath]
    }
    return defaultValue;
  }, obj);
};


const parseDate = (dateString, pattern = 'dd.MM.y HH:mm') => {
  return addHours(dateFnsParse(dateString, pattern, Date.now()), TIME_ZONE);
}


const decodeMessage = (text) => {
  return Buffer
    .from(text, "base64")
    .toString('utf-8')
    .replace(/[\n\r]/g, '');
}


module.exports = {
  noop,
  get,
  parseDate,
  decodeMessage,
}
