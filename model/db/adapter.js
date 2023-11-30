import { sequelize } from './index.js'

/**
 *
 * @param sql
 * @param options
 * @returns {Promise<[]>}
 */
async function sqlQuery (sql, options) {
  let query = await sequelize.query(sql, options)
  try {
    logger.debug('execute sql：', query[1]?.sql)
    logger.debug('sql result', JSON.stringify(query[0]))
  } catch (e) {
    logger.debug('sql result', query[0])
  }
  return query[0]
}
export { sqlQuery }
