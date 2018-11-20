/**
 * 快速构建一个组件
 */

import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as path from 'path'


export default async function generateComponent() {
  const answers: any = await inquirer
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


  const type: string = answers.route.split(':')[0]
  const route: string = `../../src/${type}`
  const name: string = answers.name

  fs.mkdir(path.resolve(__dirname, `${route}/${name}`), (err) => {
    if (err) {
      console.log(err.message)
      return
    }

    // index.tsx
    const INDEX_PROPS = `${name}Props`
    const INDEX_TSX = `import * as React from 'react'\n` +
      `import { Button } from 'antd'\n\n` +
      `import { ${INDEX_PROPS} } from './i${name}'\n\n` +
      `export default class ${name} extends React.Component<${INDEX_PROPS}, any> {\n` +
      `\tpublic props: ${INDEX_PROPS}\n` +
      `\tpublic state: {\n\n` +
      `\t}\n` +
      `\tconstructor(props) {\n` +
      `\t\tsuper(props)\n` +
      `\t}\n\n` +
      `\tpublic render() {\n` +
      `\t\treturn (<div></div>)\n` +
      `\t}\n` +
      `}\n`
    fs.writeFile(path.resolve(__dirname, `${route}/${name}/index.tsx`), INDEX_TSX, (err) => { })

    // interface
    const INTERFACE_TS = `export interface ${INDEX_PROPS} {\n\n` +
      `}\n`
    fs.writeFile(path.resolve(__dirname, `${route}/${name}/i${name}.ts`), INTERFACE_TS, (err) => { })

    // index.mdx
    const INDEX_MDX = `---\n` +
      `name: ${name}\n` +
      `route: /components/type/${name.toLowerCase()}\n` +
      `menu: ${firstUpperCase(type)} Components\n` +
      `---\n\n` +
      `import { Playground, PropsTable } from 'docz'\n` +
      `import { ${name} } from 'hawkeye-arrow'\n`
    fs.writeFile(path.resolve(__dirname, `${route}/${name}/index.mdx`), INDEX_MDX, (err) => { })

    // 添加到 type/index.ts 中
    let INDEX_TS = fs.readFileSync(path.resolve(__dirname, `${route}/index.ts`), "utf-8")
    INDEX_TS += `export { default as ${name} } from './${name}'\n`
    fs.writeFile(path.resolve(__dirname, `${route}/index.ts`), INDEX_TS, (err) => { })
  })

}

function firstUpperCase(str) {
  return str.replace(/^\S/, (s) => s.toUpperCase())
}
