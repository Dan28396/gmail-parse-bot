const dateFnsParse = require('date-fns/parse');
const addHours = require('date-fns/addHours');
const {TIME_ZONE} = require("./constants");
const difference = require('lodash.differenceby');


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
  return dateFnsParse(dateString, pattern, Date.now());
}


const decodeMessage = (text) => {
  return Buffer
    .from(text, "base64")
    .toString('utf-8')
    .replace(/[\n\r]/g, '');
}


const promisify = (func) => {
  return function(...args) {
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
}
