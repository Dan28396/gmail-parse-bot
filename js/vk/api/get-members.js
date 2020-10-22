const api = require('node-vk-bot-api/lib/api');

const {VK_TOKEN, GROUP_ID} = require('../../constants');


const getMembers = async (groupId = GROUP_ID) => {
  const members = await api('groups.getMembers', {
    group_id: groupId,
    access_token: VK_TOKEN,
  });


  return members.response.items;
}

module.exports = {
  getMembers,
}
