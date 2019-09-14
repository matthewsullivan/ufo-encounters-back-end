const path = require('path');
const {_raw, sql} = require('pg-extra');

const {pool} = require(path.resolve('./config/lib/pg'));

module.exports = {
  /**
   * Create encounter
   * @param {object} encounter
   * @return {object}
   */
  createEncounter: (encounter) => { 
    const statement = sql`
      INSERT INTO public.encounters (
        city,
        comments,
        country,
        date,
        duration_m,
        duration_s,
        latitude,
        longitude,
        shape,
        state
      )
      VALUES (
        ${encounter.city}, 
        ${encounter.comments}, 
        ${encounter.country}, 
        ${encounter.date}, 
        ${encounter.duration_m}, 
        ${encounter.duration_s}, 
        ${encounter.latitude}, 
        ${encounter.longitude}, 
        ${encounter.shape}, 
        ${encounter.state}
      )
      RETURNING *;
    `;

    return pool.query(statement);
  },

  /**
   * Delete encounter
   * @param {number} encounterId
   * @return {array}
   */
  deleteEncounter: (encounterId) => {
    const statement = sql`
      DELETE FROM public.encounters
      WHERE id = ${encounterId}
      RETURNING id;
    `;

    return pool.query(statement);
  },

  /**
   * Get encounter by id
   * @param {number} encounterId
   * @return {object}
   */
  getEncounterById: (encounterId) => {
    const statement = sql`
      SELECT *
      FROM public.encounters
      WHERE id = ${encounterId};
    `;

    return pool.query(statement);
  },

  /**
   * Get encounter by name
   * @param {string} name
   * @return {object}
   */
  getEncounterByName: (name) => {
    const statement = sql`
      SELECT *
      FROM public.encounters
      WHERE name = ${name};
    `;

    return pool.query(statement);
  },

  /**
   * Get encounters
   * @param {string} [column = 'id']
   * @param {string} [direction = 'DESC']
   * @param {number} [limit = none]
   * @param {number} [offset = 0]
   * @return {object}
   */
  getEncounters: (
    column = 'id',
    direction = 'DESC',
    limit = null,
    offset = 0
  ) => {
    const statement = sql`
      SELECT *
      FROM public.encounters
    `.append(
      _raw`
        ORDER BY "${column}" ${direction} 
        LIMIT ${limit} 
        OFFSET ${offset} 
      `
    );

    return pool.query(statement);
  },
};
