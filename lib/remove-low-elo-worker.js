const workerpool = require('workerpool');
const Faceit = require('faceit-js');
const _ = require('lodash');

const constants = require('../constants');

const axios = require('axios').default;

/* Accept Application Worker */

const api = new Faceit(constants.APP_TOKEN);

const genRemoveLowElo = async (user) => {
  const userElo = await genEloForUserId(user.user_id);

  if (userElo >= constants.MIN_ELO || isUserShielded(user)) {
    return false;
  }

  await genRemoveUserFromHub(user);

  return true;
}

const isUserShielded = (user) => {
  return !_
    .chain(constants.SHIELDED_ROLE)
    .intersection(user.roles)
    .isEmpty()
    .value();
}

const genEloForUserId = async (user_id) => {
  const userData = await api.players(user_id);
  return userData.games.csgo.faceit_elo;
}

  const genRemoveUserFromHub = async (user) => {
    try {
      await axios({
        method: 'delete',
        url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/membership/' + user.user_id,
        headers: {
          authorization: constants.AUTH_TOKEN,
          content_type: 'application/json',
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
// create a worker and register public functions
workerpool.worker({
  removeLowElo: genRemoveLowElo,
});
