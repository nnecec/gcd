/**
 * 快速构建一个组件
 */

import * as fs from 'fs'
import * as path from 'path'

import * as inquirer from 'inquirer'


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
  const Name: string = firstUpperCase(name)
  const isComplex = type !== 'complex'

  fs.mkdir(path.resolve(__dirname, `${route}/${Name}`), (err) => {
    if (err) {
      console.log(err.message)
      return
    }
    readAndWriteFile(route, name, isComplex)

    // 添加到 type/index.ts 中
    let INDEX_TS = fs.readFileSync(path.resolve(__dirname, `${route}/index.ts`), "utf-8")
    INDEX_TS += `export { default as ${Name} } from './${Name}'\n`
    fs.writeFile(path.resolve(__dirname, `${route}/index.ts`), INDEX_TS, (err) => { })
  })

}

function firstUpperCase(str) {
  return str.replace(/^\S/, (s) => s.toUpperCase())
}

/**
 *
 *
 * @param {string} target 目标生成路径 
 * @param {string} name 目标名称
 * @param {boolean} isComplex 是否是复杂组件
 */
function readAndWriteFile(target: string, name: string, isComplex: boolean): void {
  const template = './template/complex'
  const files = ['index.tsx', 'index.mdx', 'interface.ts', 'index.less']

  const Name = firstUpperCase(name)

  // index
  for (const file of files) {
    fs.readFile(path.resolve(__dirname, `${template}/${file}`), 'utf8', (err, content) => {
      content = content.replace(/COMPONENT_NAME_PROPS/g, `${Name}Props`)
        .replace(/COMPONENT_NAME/g, file.includes('.mdx') ? name : Name)


      fs.writeFile(path.resolve(__dirname, `${target}/${name}/${file}`), content, (err) => { })
    })
  }
}