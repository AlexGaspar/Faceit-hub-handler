
const cliProgress = require('cli-progress');

const constants = require('./constants');
const MemberCleanup = require('./lib/member-cleanup');
const AccepterMember = require('./lib/accept-member');

if (constants.RUN_APPROVAL) {
  const acceptingBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let accepter = new AccepterMember(40, acceptingBar);
  accepter.run();
}

if (constants.RUN_KICK) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let memberCleanup = new MemberCleanup(40, bar);
  memberCleanup.run();
}
