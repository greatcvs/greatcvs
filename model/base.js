import Constant from '../constant/Constant.js'
export default class base {
  constructor (e = {}) {
    this.e = e
    this.userId = e?.user_id
    this.model = 'GreatCvs'
  }

  get prefix () {
    return `${Constant.REDIS_PREFIX}${this.model}:`
  }
}
