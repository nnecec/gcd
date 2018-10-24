/**
 * 快速构建一个组件
 */

import * as fs from 'fs'
import * as path from 'fs'
import * as inquirer from 'inquirer'


inquirer
  .prompt([{
    type: 'list',
    name: 'route',
    message: '请选择创建的组件类型',
    choices: [
      'basic: 基础组件',
      'complex: 复杂组件'
    ]
  }, {
    type: 'input',
    name: 'name',
    message: '请输入组件名称',
  }])
  .then(async answers => {
    const route = `src/${answers.route.split(':')[0]}/`
    const name = answers.name

    console.log(route, name)

    await fs.mkdirSync(`${route}${name}`)

    const INDEX_TSX = `
    import * as React from 'react'
    import { Button } from 'antd'
    `
    fs.writeFile(`${route}${name}/${name}.tsx`, INDEX_TSX, (err) => { })

  })