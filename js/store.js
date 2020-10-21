const fs = require('fs');
const path = require('path');

const {STORE_PATH} =  require('./constants');
const { promisify } = require('./utils');


const writeFile = promisify(fs.writeFile);

const saveMessages = async (messages) => {
  return writeFile(path.join(STORE_PATH, 'messages.json'), JSON.stringify(messages), 'utf-8');
}

module.exports = {
  saveMessages,
}
