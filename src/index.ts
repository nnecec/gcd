
(() => {
  if (window) {
    require('antd/dist/antd.css')
  }
})()
// Ant 基础组件
export * from './basic'
// 业务组件
export * from './complex'
// 导出 Ant 组件
import * as Ant from 'antd'
export { Ant }
