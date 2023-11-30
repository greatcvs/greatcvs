import { MysUserTokenDB, sequelize } from './db/index.js'
import base from '../../genshin/model/base.js'

export default class UserToken extends base {
  constructor (e) {
    super(e)
    this.e = e
    this.model = 'bingToken'
  }

  async initDB (db = false) {
    if (this.db && !db) {
      return
    }
    db = db && db !== true ? db : await MysUserTokenDB.find(this.ltuid || this.e.user.mysUser.ltuid, true)
    this.db = db
    await this.setTokenData(db)
  }

  async setTokenData (db) {
    if (!db) {
      return
    }
    this.token = db.token
    this.device = db.device
    this.gs_uid = db.gs_uid
    this.sr_uid = db.sr_uid
    this.note_push = db.note_push
    this.is_sign = db.is_sign
    this.is_unity_sign = db.is_unity_sign
  }

  async getToken () {
    console.log(this.e.user.mysUser)
  }
}
