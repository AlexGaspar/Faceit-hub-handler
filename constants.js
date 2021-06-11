module.exports = Object.freeze({
  HUB_ID: 'd7e41119-ab72-465b-ad93-00923c148baf',
  // HUB_ID: '84a5026b-9aa5-47bd-b638-dbd15d2e41d8',
  PUBLIC_API_HUB: 'https://api.faceit.com/hubs/v1/hub/',
  PUBLIC_API_STATS: 'https://api.faceit.com/stats/v1/stats/users/',
  AUTH_TOKEN: 'FILL_THIS_WITH_A_REAL_ADMIN_TOKEN',
  APP_TOKEN: 'FILL_ME_WITH_AN_APP_TOKEN',

  // App Settings
  PAUSE_BETWEEN_RUN: 60 * 60 * 1000, // in ms (1 hour)
  PAUSE_BETWEEN_REQUEST: 5000, // in ms (2) sec)

  RUN_KICK: true, // should we run the kick function
  RUN_APPROVAL: false, // should we run the approval function

  MIN_ELO: 1800,
  MIN_MATCHES: 300,
  SHIELDED_ROLE: [
    'owner',
    'de5d1039-bfc7-4202-9963-87b00120749a', // Basic Shielded role
  ],

  // Worker Options
  worker: {
    maxWorkers: 5,
  },

  // Fake data
  fake_applications: [
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    },
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    },
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    },
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    },
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    },
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    },
    {
      user: {
        avatarUrl: 'https://assets.faceit-cdn.net/avatars/151104a0-b2da-4d56-b76f-51f1d482434e_1614023054024.jpg',
        nickname: 'testUser',
        guid: '151104a0-b2da-4d56-b76f-51f1d482434e',
        country: 'FR'
      },
      competition: {
        guid: 'd7e41119-ab72-465b-ad93-00923c148baf',
        game: 'csgo',
        name: 'Test - 2400 Elo',
        organizerGuid: '158ffdcb-9262-434c-bc7b-0dae494b61fd'
      },
      applicantInput: 'jhgrhzh iezapghipo huierpz h',
      status: 'pending',
      createdBy: { guid: '151104a0-b2da-4d56-b76f-51f1d482434e' },
      createdAt: '2021-05-18T19:10:16.992+00:00',
      applicantSkillLevel: 8
    }
  ],
});
