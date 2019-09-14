const path = require('path');
const process = require('process');

const environment = require(path.resolve('./config/env/development.js'));

const mainConfig = {
  db: {
    database: process.env.DB_DATABASE || 'ufo_encounters',
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  session: {
    httpOnly: true,
    key: 'koa:sess',
    maxAge: 12 * 60 * 60 * 1000,
    overwrite: true,
    signed: true,
  },
};

const config = Object.assign(mainConfig, environment);

module.exports = config;
