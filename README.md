# Discord Bot

## Pre-requisites

* NodeJS v16.
* NPM (comes with NodeJS)
* A discord bot (token and clientId)
* A discord guild (or server) that the bot is in and its id.
* Discord account to interact with the bot.

## Setup

1.) Run `npm install`

2.) Create a `config.json` file in this directory and add in the following values:

```json
 {
    "token": "your discord bot token",
    "guildId": "your guild's id",
    "clientId": "bot client id",
    "mlAPI": "your machine learning api for scoring"
 }
```

3.) Run `npm run deploy` to register the commands.

4.) Run `npm start` to start the discord bot.