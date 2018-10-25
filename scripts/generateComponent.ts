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
    const type = answers.route.split(':')[0]
    const route = `src/${type}`
    const name = answers.name

    fs.mkdir(`${route}/${name}`, (err) => {
      if (err) {
        console.log(err.message)
        return
      }

      // index.tsx
      const INDEX_PROPS = `${name}Props`
      const INDEX_TSX = `import * as React from 'react'\nimport { Button } from 'antd'\n\nimport { ${INDEX_PROPS} } from './i${name}'\n\nexport default class ${name} extends React.Component<${INDEX_PROPS}, any> {\n\tpublic props: ${INDEX_PROPS}\n\tpublic state: {\n\n\t}\n\tconstructor(props) {\n\t\tsuper(props)\n\t}\n\n\tpublic render() {\n\t\treturn (<div></div>)\n\t}\n}\n`
      fs.writeFile(`${route}/${name}/index.tsx`, INDEX_TSX, (err) => { })

      // interface
      const INTERFACE_TS = `export interface ${INDEX_PROPS} {\n\n}\n`
      fs.writeFile(`${route}/${name}/i${name}.ts`, INTERFACE_TS, (err) => { })

      // index.mdx
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