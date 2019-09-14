
## Install

Open terminal at project root and execute

    $ npm install

## Configure

### CORS 

Set origin (client) URL

    $ export URL_ORIGIN='http://127.0.0.1:3000'

## Setup

Create PostgreSQL database

    $ ufo_encounters

Initialize and seed database

    $ npm run db-init

## Serve

    $ export npm run start

## Example

    http://127.0.0.1:3000/api/v1/encounters
