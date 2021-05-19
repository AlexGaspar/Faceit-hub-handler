
const Faceit = require('faceit-js');
const workerpool = require('workerpool');
const axios = require('axios').default;
const constants = require('./constants');

const api = new Faceit(constants.APP_TOKEN);

/**
 * Main Entry points
 */

const pool_accept = workerpool.pool(__dirname + '/lib/accept-application-worker.js', constants.worker);

const genUsersWaitingApproval = async () => {
  try {
    const res = await axios({
      url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/application?limit=5&offset=0&sort=asc',
      headers: {
        authorization: `Bearer ${constants.AUTH_TOKEN}`,
        content_type: "application/json",
      }
    });

    res.data.payload.items.map(user => {
      pool_accept.exec('maybeAcceptUser', [user])
        .catch(function (err) {
          console.error(err);
        });
    });
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(genUsersWaitingApproval, constants.PAUSE_BETWEEN_RUN);
  }
};

const pool_remove = workerpool.pool(__dirname + '/lib/remove-low-elo-worker.js', constants.worker);

const genHubMembersWithLessThanMinElo = async () => {
  try {
    const data = await api.hubs(constants.HUB_ID, 'members');

    data.items.map(user => {
      pool_remove.exec('removeLowElo', [user])
        .catch(function (err) {
          console.error(err);
        });
    });
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(genHubMembersWithLessThanMinElo, constants.PAUSE_BETWEEN_RUN);
  }
}

if (constants.RUN_KICK) {
  genHubMembersWithLessThanMinElo();
}

if (constants.RUN_APPROVAL) {
  genUsersWaitingApproval();
}
