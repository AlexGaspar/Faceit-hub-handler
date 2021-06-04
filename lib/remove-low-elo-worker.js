const workerpool = require('workerpool');
const Faceit = require('faceit-js');
const _ = require('lodash');

const constants = require('../constants');

const axios = require('axios').default;


/* Accept Application Worker */

const api = new Faceit(constants.APP_TOKEN);

const genRemoveLowElo = async (user) => {
  const userMatchCount = await genMatchesNumberForUserName(user.user_id);
  const userElo = await genEloForUserId(user.user_id);

  if (userMatchCount <= constants.MIN_MATCHES) {
    console.log(user.nickname + ' ' + userMatchCount);
  }

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

const genEloForUserId = async (userId) => {
  const userData = await api.players(userId);
  return userData.games.csgo.faceit_elo;
}

const genMatchesNumberForUserName = async (user_id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: constants.PUBLIC_API_STATS + user_id + '/games/csgo',
      headers: {
        authorization: `Bearer ${constants.AUTH_TOKEN}`,
        content_type: 'application/json',
      },
    });
  
    return res.data.lifetime.m1;
  } catch (e) {
    console.error(e);
  }
}

const genRemoveUserFromHub = async (user) => {
  return;
  try {
    await axios({
      method: 'delete',
      url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/membership/' + user.user_id,
      headers: {
        authorization: `Bearer ${constants.AUTH_TOKEN}`,
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
