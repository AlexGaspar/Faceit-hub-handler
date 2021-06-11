"use strict";

const Faceit = require('faceit-js');
const constants = require('../constants');

const api = new Faceit(constants.APP_TOKEN);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class Worker {

  constructor(limit, bar) {
    this.limit = limit;
    this.progressBar = bar
    this.offset = 0;
    this.retries = 0;
  }

  // Function to be overriden to return a list of users
  async genFetchMembers() { }

  async genProcessMember() { }

  async pre_run() { }

  async post_run() { }

  async run() {
    await this.pre_run();

    while (await this.genProcessBatchOfMembers()) {
      // Let's wait a few seconds just not to flood the FaceIT API too much
      await delay(constants.PAUSE_BETWEEN_REQUEST);
    }

    await this.post_run();
  }

  incrementOffset() {
    this.offset += this.limit;
  }

  async genProcessBatchOfMembers() {
    try {
      const members = await this.genFetchMembers();

      await Promise.all(
        members.map(
          async member => {
            try {
              await this.genProcessMember(member)
            } catch (e) {
              // Retry one more time
              await this.genProcessMember(member)
            }
          }
        ));

      this.incrementOffset();

      return members !== 0;
    } catch (e) {
      console.error(e);
      return ++this.retries < 3;
    }
  }

  async genEloForUserId (userId) {
    const userData = await api.players(userId);
    return userData.games.csgo.faceit_elo;
  }

  async genMatchCountForMemberId (user_id) {
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

  async genDoesMeetCriteria(memberId) {
    const userElo = await this.genEloForUserId(memberId);
    const userMatchCount = await this.genMatchCountForMemberId(memberId);

    return (
      (userMatchCount == null || userMatchCount > constants.MIN_MATCHES)
      && userElo >= constants.MIN_ELO
    );
  }
}

module.exports = Worker;
