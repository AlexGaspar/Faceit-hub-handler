const Faceit = require('faceit-js');
const _ = require('lodash');
const constants = require('../constants');
const fs = require('fs')

const Worker = require('./worker');

const axios = require('axios').default;
const api = new Faceit(constants.APP_TOKEN);

class MemberCleanup extends Worker {

  constructor(limit, bar) {
    super(limit, bar);
    this.EstimatePlayerToProcess = null;
    this.memberProcessed = 0;
    this.membersToKick = [];
  }

  async pre_run() {
    // Before we start let's fetch the number of members to estimate how longs it's gonna take
    let hubData = await api.hubs(constants.HUB_ID);

    this.playerToProcess = hubData.players_joined;
    this.progressBar.start(hubData.players_joined);
  }

  async post_run() {
    console.info('\nRun finished', this.memberProcessed, 'members processed out of', hubData.players_joined);
    console.info('Members to kick ::');
    await fs.writeFile('../res.json', this.membersToKick);
  }

  async genFetchMembers() {
    const data = await api.hubs(constants.HUB_ID, 'members', this.offset, this.limit);
    return data.items;
  }

  addMemberToKickList(member, matchesCount, elo) {
    this.membersToKick.push({nickname: member.nickname, matches: matchesCount, elo: elo});
  }

  isMemberShielded = (member) => {
    return !_
      .chain(constants.SHIELDED_ROLE)
      .intersection(member.roles)
      .isEmpty()
      .value();
  }

  markPlayerAsProcessed() {
    this.progressBar.increment();
    this.memberProcessed++;
  }

  async genProcessMember(member) {
    // Protect special members from getting kicked
    if (this.isMemberShielded(member)) {
      this.markPlayerAsProcessed();
      return false;
    }

    const doesMeetCriteria = await this.genDoesMeetCriteria(member.user_id);
    if (doesMeetCriteria) {
      this.markPlayerAsProcessed();
      return false;
    }

    // await this.genRemoveUserFromHub(member);

    this.addMemberToKickList(member, userMatchCount, userElo);
    this.markPlayerAsProcessed();
  }

  async genRemoveUserFromHub (member) {
    try {
      await axios({
        method: 'delete',
        url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/membership/' + member.user_id,
        headers: {
          authorization: `Bearer ${constants.AUTH_TOKEN}`,
          content_type: 'application/json',
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = MemberCleanup;
