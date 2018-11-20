/**
 * 选择执行哪个脚本
 */

import * as fs from 'fs'
import * as inquirer from 'inquirer'

import generateComponent from './generateComponent'
import generateComponentTests from './generateComponentTests'

(async () => {
  const answers: any = await inquirer.prompt([{
    type: 'list',
    name: 'shot',
    message: 'please choose one arrow to shot',
    choices: [
      'generate component',
      'generate component tests'
    ]
  }])

  const { shot } = answers

  switch (shot) {
    case 'generate component':
      generateComponent()
      break
    case 'generate component tests':
      generateComponentTests()
      break
    default:
      return
  }


})()
