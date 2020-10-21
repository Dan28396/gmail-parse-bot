const {updateMessages} = require('../index');

const onStart = () => {
  updateMessages();
}

const onUpdate = () => {
  updateMessages();
}

module.exports = {
  onStart,
  onUpdate,
}
