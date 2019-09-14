const path = require('path');

const encounterController = require(path.resolve(
  './modules/encounter/controllers/encounter.controller.js'
));
const encounterObject = require(path.resolve(
  './config/lib/seed/objects/encounters.json'
));

const seed = (() => {
  /**
   * Create encounter
   * @async
   */
  const createEncounter = async () => {
    console.log(`createEncounter [${new Date().toString()}]`);

    const ctx = {
      request: {
        body: {},
      },
    };
    const encounters = JSON.parse(JSON.stringify(encounterObject));

    for (const encounter of encounters) {
      ctx.request.body = encounter;

      await encounterController.createEncounter(encounter);
    }
  };

  /**
   * Init
   * @async
   */
  const init = async () => {
    await createEncounter();
  };

  return {
    init: init,
  };
})();

seed.init().then(process.exit);
