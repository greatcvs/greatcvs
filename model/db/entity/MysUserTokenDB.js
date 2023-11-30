import BaseModel from '../base.js'

const { Types } = BaseModel

const COLUMNS = {
  // 通行证ID
  ltuid: {
    type: Types.INTEGER,
    primaryKey: true
  },

  // MysUser类型，mys / hoyolab
  type: {
    type: Types.STRING,
    defaultValue: 'mys',
    notNull: true
  },

  // token 必填
  token: {
    type: Types.STRING,
    notNull: true
  },
  // 设备
  device: Types.STRING,

  gs_uid: Types.STRING,
  sr_uid: Types.STRING,

  // 体力推送
  note_push: {
    type: Types.INTEGER,
    defaultValue: 0,
    notNull: true
  },
  // 是否签到
  is_sign: {
    type: Types.INTEGER,
    defaultValue: 1,
    notNull: true
  },
  // 是否社区签到
  is_unity_sign: {
    type: Types.INTEGER,
    defaultValue: 1,
    notNull: true
  }
}

class MysUserTokenDB extends BaseModel {
  static async find (ltuid = '', create = false) {
    // DB查询
    let mys = await MysUserTokenDB.findByPk(ltuid)
    if (!mys && create) {
      mys = await MysUserTokenDB.build({
        ltuid
      })
    }
    return mys || false
  }

  async saveDB (mys) {
    if (!mys.ltuid || !mys.token || !mys.device || !mys.db) {
      return false
    }
    let db = this
    this.ltuid = mys.ltuid
    this.token = mys.token
    this.type = mys.type
    this.device = mys.device
    this.gs_uid = mys.gs_uid
    this.sr_uid = mys.sr_uid
    this.is_sign = mys.is_sign
    this.is_unity_sign = mys.is_unity_sign
    await db.save()
  }
}
// 初始化数据库
await BaseModel.initDB(MysUserTokenDB, COLUMNS)
// 同步数据库
await MysUserTokenDB.sync()
// 检测数据库字段是否需要更新
await MysUserTokenDB.updateDB(MysUserTokenDB, COLUMNS)
export default MysUserTokenDB
