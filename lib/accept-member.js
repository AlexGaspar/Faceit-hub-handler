"use strict";

const Faceit = require('faceit-js');
const axios = require('axios').default;

const constants = require('../constants');
const Worker = require('./worker');

const api = new Faceit(constants.APP_TOKEN);

class AcceptMember extends Worker {
  constructor(limit, bar) {
    super(limit, bar);
    this.memberAccepted = [];
  }

  getName() {
    return 'Accepter Worker';
  }

  getDelayBetweenRun() {
    return constants.PAUSE_BETWEEN_RUN_ACCETPER;
  }

  async pre_run() {
    this.progressBar.start();
  }

  async genFetchMembers() {
    const res = await axios({
      url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/application?limit='+this.limit+'&offset='+this.offset+'&sort=asc',
      headers: {
        authorization: `Bearer ${constants.AUTH_TOKEN}`,
        content_type: "application/json",
      }
    });

    return res.data.payload.items;
  }

  async genProcessMember(member) {
    const doesMeetCriteria = await this.genDoesMeetCriteria(member.user.guid);
    if (!doesMeetCriteria) {
      this.markPlayerAsProcessed();
      return false;
    }

    try {
      await this.genApproveWaitingMember(member);
    } catch {
      // try one more time on failure
      console.error(e);
      await this.genApproveWaitingMember(member);
    }
  }

  async genApproveWaitingMember(member) {
    const memberId = member.user.guid;
    return;

    await axios({
      method: 'post',
      url: constants.PUBLIC_API_HUB + constants.HUB_ID + '/application/' + memberId + '/accept',
      headers: {
        authorization: `Bearer ${constants.AUTH_TOKEN}`,
        content_type: 'application/json',
      },
      data: {
        hubGuid: constants.HUB_ID,
        userGuid: memberId,
      },
    });

    this.memberAccepted.push(member);
  }
}

module.exports = AcceptMember;
