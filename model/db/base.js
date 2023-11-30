import { Sequelize, DataTypes, Model } from 'sequelize'
import moment from 'moment'

let dbPath = process.cwd() + '/data/db/data.db'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: true
})

await sequelize.authenticate()

export default class BaseModel extends Model {
  static Types = DataTypes

  static initDB (model, columns) {
    let name = model.name
    name = name.replace(/DB$/, 's')
    model.init(columns, { sequelize, tableName: name })
    model.COLUMNS = columns
  }

  // 检测数据库字段是否需要更新
  static async updateDB (model, columns) {
    // 开启事务
    let transaction = await sequelize.transaction()
    try {
      let name = this.name
      name = name.replace(/DB$/, 's')
      let table = await sequelize.query(`PRAGMA table_info(${name})`)
      let tableColumns = table[0]
      let updateColumns = []
      // columns Object
      for (let column in columns) {
        let tableColumn = tableColumns.find(item => item.name === column)
        if (!tableColumn) {
          updateColumns.push(column)
        }
      }
      if (updateColumns.length > 0 && table) {
        // 读取当前表的全部数据
        let data = await this.oldFindAll(name)
        // 备份表
        let date = moment().format('YYYYMMDDHHmmss')
        await sequelize.query(`CREATE TABLE ${name}_old_${date} AS SELECT * FROM ${name}`)
        // // 删除表
        await sequelize.query(`DROP TABLE ${name}`)
        // 重新创建表
        await model.sync({ force: true })
        // 重新写入数据
        for (let item of data) {
          await model.build(item).save({ transaction })
        }
        await transaction.commit()
      }
    } catch (e) {
      logger.error('修改数据库字段失败', e)
      await transaction.rollback()
    }
  }

  // 读取旧表数据
  static async oldFindAll (name = '') {
    if (!name) {
      name = this.name
    }
    name = name.replace(/DB$/, 's')
    return sequelize.query(`SELECT * FROM ${name}`).then(data => {
      return data[0]
    })
  }
}
export { sequelize, DataTypes }
