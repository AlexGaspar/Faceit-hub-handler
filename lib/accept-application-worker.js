const workerpool = require('workerpool');
const Faceit = require('faceit-js');
const axios = require('axios').default;
const constants = require('../constants');

/* Accept Application Worker */

const api = new Faceit(constants.APP_TOKEN);

const genMaybeAcceptUser = async (user) => {
    console.log('Getting Elo for user');
    const userElo = await genEloForUserId(user.user.guid);
    console.log(userElo);

    if (userElo < constants.MIN_ELO) {
      return false;
    }

  await genSendInviteToWaitingUser(user);

  return true;
}

const genEloForUserId = async (user_id) => {
    const userData = await api.players(user_id);
    return userData.games.csgo.faceit_elo;
  }

  const genSendInviteToWaitingUser = async (user_id) => {
    try {
      await axios({
        method: 'post',
        url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/application/' + user_id + '/accept',
        headers: {
          authorization: constants.AUTH_TOKEN,
          content_type: 'application/json',
        },
        data: {
          hubGuid: constants.HUB_ID,
          userGuid: user_id,
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
