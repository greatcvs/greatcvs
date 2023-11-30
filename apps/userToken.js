import plugin from '../../../lib/plugins/plugin.js'
import UserToken from '../model/UserToken.js'

export class userToken extends plugin {
  constructor (e) {
    super({
      name: '用户管理:Great',
      dsc: '用户管理',
      event: 'message',
      priority: 50,
      rule: [
        {
          reg: '^#?我的(token|stoken)$',
          fnc: 'getToken'
        }
      ]
    })
  }

  async getToken () {
    return false
    const user = new UserToken(this.e)
    return user.getToken()
  }
}
