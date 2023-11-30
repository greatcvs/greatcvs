import plugin from '../../../lib/plugins/plugin.js'

import Admin from '../model/admin.js'
import GreatCfg from '../model/cfg.js'

export class admin extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: 'GreatCvs-Admin',
      dsc: '更新插件',
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: GreatCfg.get('priority'),
      rule: [
        { reg: '^#(great|Great)(强制)?更新$', fnc: 'updateGreatCvs', permission: 'master' }
      ]
    })
  }

  /**
   * updateCopyPlugin
   * @returns {Promise<boolean>}
   */
  async updateGreatCvs () {
    const admin = new Admin(this.e)
    await admin.updateGreatCvs()
  }
}
