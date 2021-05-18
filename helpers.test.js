const helpers = require('./helpers');

// const MY_USER_ID = '158ffdcb-9262-434c-bc7b-0dae494b61fd';

test('Guard Shielded users from getting removed', async () => {
  const usersToRemove = await helpers.genRemoveShieldedFromList([  {
    hub_roles: ['member', 'owner', 'de5d1039-bfc7-4202-9963-87b00120749a']
  }]);
  expect(usersToRemove.length).toBe(0);
});

test('Guard owners from getting removed', async () => {
  const usersToRemove = await helpers.genRemoveShieldedFromList([  {
    hub_roles: ['owner']
  }]);
  expect(usersToRemove.length).toBe(0);
});

test('User without shields should be removed', async () => {
  const usersToRemove = await helpers.genRemoveShieldedFromList([  {
    hub_roles: ['member']
  }]);
  expect(usersToRemove.length).toBe(1);
});

// test('Get users with less than a certain elo', async () => {
//   api.hubs.mockResolvedValue([]);

//   const usersToRemove = await helpers.genHubMembersWithLessThan(3000);
//   expect(usersToRemove).toBe
// });
