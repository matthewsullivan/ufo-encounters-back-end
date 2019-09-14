const router = require('koa-router')();
const path = require('path');

const encounterController = require(path.resolve(
'./modules/encounter/controllers/encounter.controller.js'
));

router
  .del('/api/v1/encounters/:id', encounterController.deleteEncounter)

  .get('/api/v1/encounters', encounterController.getEncounters)
  .get('/api/v1/encounters/:id', encounterController.getEncounter)
  .get('/api/v1/encounters/name/:name',encounterController.getEncounterByName)

  .post('/api/v1/encounter', encounterController.createEncounter)

module.exports = router;
