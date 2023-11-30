import lodash from 'lodash'
import cfg from './model/cfg.js'

// 支持锅巴
export function supportGuoba () {
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: 'GreatCvs',
      title: 'GreatCvs',
      author: '@story-x',
      authorLink: 'https://github.com/GreatCvs',
      link: 'https://github.com/GreatCvs/GreatCvs',
      isV3: true,
      isV2: false,
      description: 'copy插件',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: ''
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          // 腾讯智能对话平台-Bot信息-BotId
          field: 'admin.operationQQ',
          label: 'operationQQ',
          bottomHelpMessage: '插件全局执行定时任务的qq(不填默认当前)',
          component: 'Input',
          componentProps: {
            style: 'width: 100%;',
            placeholder: '请输入全局执行定时任务QQ'
          }
        }

      ],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData () {
        return cfg.merged
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData (data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          // 特殊处理 server.host
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, cfg.merged, config)
        cfg.config.reader.setData(config)
        return Result.ok({}, '保存成功~')
      }
    }
  }
}
