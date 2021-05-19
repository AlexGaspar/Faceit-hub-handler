const workerpool = require('workerpool');
const Faceit = require('faceit-js');
const axios = require('axios').default;
const constants = require('../constants');

/* Accept Application Worker */

const api = new Faceit(constants.APP_TOKEN);

const genMaybeAcceptUser = async (user) => {
  const userElo = await genEloForUserId(user.user.guid);

  if (userElo < constants.MIN_ELO) {
    return false;
  }

  await genSendInviteToWaitingUser(user);

  return true;
}

const genEloForUserId = async (userId) => {
  const userData = await api.players(userId);
  return userData.games.csgo.faceit_elo;
}

const genSendInviteToWaitingUser = async (userId) => {
  try {
    await axios({
      method: 'post',
      url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/application/' + userId + '/accept',
      headers: {
        authorization: `Bearer ${constants.AUTH_TOKEN}`,
        content_type: 'application/json',
      },
      data: {
        hubGuid: constants.HUB_ID,
        userGuid: userId,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
// create a worker and register public functions
workerpool.worker({
  maybeAcceptUser: genMaybeAcceptUser,
});
