/**
 * 快速构建一个组件测试
 */

import * as fs from 'fs'
import * as inquirer from 'inquirer'
import * as path from 'path'

const RouteBasic: string = path.resolve(__dirname, '../../src/basic')
const RouteComplex: string = path.resolve(__dirname, '../../src/complex')

export default async function generateComponentTests() {

  const answers: any = await inquirer
    .prompt([{
      type: 'input',
      name: 'name',
      message: '请输入需要添加测试的组件名称',
    }])

  const name: string = answers.name

  const DirBasics: string[] = fs.readdirSync(RouteBasic)
  const DirComplexes: string[] = fs.readdirSync(RouteComplex)

  let route = '../../src/'
  if (DirBasics.includes(name))
    route += `basic/${name}`
  else if (DirComplexes.includes(name))
    route += `complex/${name}`
  else
    throw Error('This component is not exist.')

  console.log(route)
  const RouteTest = path.resolve(__dirname, `${route}/__test__`)

  if (!fs.existsSync(RouteTest)) {
    fs.mkdirSync(RouteTest)
  }

  const TEST_TS = `import * as React from 'react'\n` +
    `import { shallow, mount } from 'enzyme'\n\n` +
    `import ${name} from '..'\n\n` +
    `describe('${name}:', () => {\n` +
    `\ttest('${name}: basic', () => {\n` +
    `\t})\n` +
    `})\n`

  fs.writeFile(path.resolve(RouteTest, `./index.test.tsx`), TEST_TS, (err) => {
    if (err) throw err
    console.log('Success')
  })

}