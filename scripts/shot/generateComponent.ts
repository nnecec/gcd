/**
 * 快速构建一个组件
 */

import * as fs from 'fs'
import * as path from 'path'
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
    const type = answers.route.split(':')[0]
    const route = `src/${type}`
    const name = answers.name

    fs.mkdir(`${route}/${name}`, (err) => {
      if (err) {
        console.error(err.message)
        return
      }

      // 写入 index.tsx
      const INDEX_TSX = `import * as React from 'react'\nimport { Button } from 'antd\n'
    `
      fs.writeFile(`${route}/${name}/index.tsx`, INDEX_TSX, (err) => { })


      // 写入 index.mdx
      const INDEX_MDX = `---\nname: ${name}\nroute: /components/type/${name.toLowerCase()}\nmenu: ${firstUpperCase(type)} Components\n---\n\nimport { Playground, PropsTable } from 'docz'\nimport { ${name} } from 'hawkeye-arrow'\n`

      fs.writeFile(`${route}/${name}/index.mdx`, INDEX_MDX, (err) => { })

      // 添加到 type/index.ts 中
      let INDEX_TS = fs.readFileSync(`${route}/index.ts`, "utf-8")
      INDEX_TS += `export { default as ${name} } from './${name}'\n`

      fs.writeFile(`${route}/index.ts`, INDEX_TS, (err) => { })
    })

  })



function firstUpperCase(str) {
  return str.replace(/^\S/, (s) => s.toUpperCase())
}