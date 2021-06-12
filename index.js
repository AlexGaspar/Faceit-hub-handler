
const cliProgress = require('cli-progress');

const constants = require('./constants');
const MemberCleanup = require('./lib/member-cleanup');
const AccepterMember = require('./lib/accept-member');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function run_forever(worker) {
  while (true) {
    console.log('--** Runing ' + worker.getName() + ' **--');
    await worker.run();
    console.log('worker done, pausing for', worker.getDelayBetweenRun());
    await delay(worker.getDelayBetweenRun());
  }
}

if (constants.RUN_APPROVAL) {
  // const acceptingBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let accepter_worker = new AccepterMember(40, null);

  run_forever(accepter_worker);
}

if (constants.RUN_KICK) {
  const cleanupBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let member_cleanup_worker = new MemberCleanup(40, cleanupBar);

  run_forever(member_cleanup_worker);
}
