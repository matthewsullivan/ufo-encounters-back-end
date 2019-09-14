const path = require('path');

const encounterService = require(path.resolve(
  './modules/encounter/services/encounter.service.js'
));

module.exports = {
  /**
   * Create encounter
   * @async
   * @param {object} ctx
   */
  createEncounter: async (ctx) => {
    const encounter = ctx.request.body;
    const result = await encounterService.creatEncounter(encounter);

    if (result.rowCount) {
      ctx.status = 201;
    }
  },

  /**
   * Delete encounter
   * @async
   * @param {object} ctx
   */
  deleteEncounter: async (ctx) => {
    const encounterId = ctx.params.id;
    const result = await encounterService.deletEencounter(encounterId);

    ctx.body = result.rows;

    if (!result.rowCount) {
      ctx.status = 204;
    }
  },

  /**
   * Get encounter
   * @async
   * @param {object} ctx
   */
  getEncounter: async (ctx) => {
    const encounterId = ctx.params.id;
    const result = await encounterService.getEncounterById(encounterId);

    const encounter = result.rows[0];

    ctx.body = encounter;
  },

  /**
   * Get encounter by name
   * @async
   * @param {object} ctx
   */
  getEncounterByName: async (ctx) => {
    const name = ctx.params.name;
    const result = await encounterService.getEncounterByName(name);

    const encounter = result.rows[0];

    ctx.body = encounter;
  },

  /**
   * Get encounters
   * @async
   * @param {object} ctx
   */
  getEncounters: async (ctx) => {
    const resultA = await encounterService.getEncounters();
    const resultB = await encounterService.getEncounters(
      ctx.request.query.column,
      ctx.request.query.direction,
      ctx.request.query.limit,
      ctx.request.query.offset
    );

    ctx.body = {
      rows: resultB.rows,
      totalCount: resultA.rowCount,
    };
  },
};
