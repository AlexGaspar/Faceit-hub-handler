# Faceit-hub-handler

### Install the dependencies

`npm i`

### Update constants.js

Set `HUB_ID` to the hub's ID, format should be something like: `d7e41119-ab72-465b-ad93-00923c148baf`

Set `AUTH_TOKEN` to an hub's owner auth token, this is due to the public API not exposing all the functionnality we need and so we have to query the "undocumented" API

Set `APP_TOKEN` to an API KEY from https://developers.faceit.com/docs/auth/api-keys

Optinal Settings:

- `PAUSE_BETWEEN_RUN: number`  How long (in ms) should we wait before running the kick/approved function again
- `RUN_KICK: bool` If set to `true` this instance will remove hub members with ELO lower than `MIN_ELO`
- `RUN_APPROVAL: bool`  If set to `true` this instance will approve application for users with ELO greater or equals to `MIN_ELO`
- `MIN_ELO: number` The minimum elo required to be a member of the hub
- `SHIELDED_ROLE: array<string>` As admin might or special member might not have the required elo but we might still want to keep 
- `maxWorkers: number ` How many users will be proccessed in parallel, this is to avoid the script firing 100s of requests to Faceit at the same time. 

### Run the script 

`node index.js`
