/**
 * 选择执行哪个脚本
 */

import * as fs from 'fs'
import * as path from 'path'
import * as inquirer from 'inquirer'

import generateComponent from './generateComponent'

(async () => {
  const answers = await inquirer.prompt([{
    type: 'rawlist',
    name: 'shot',
    message: 'please choose one arrow to shot',
    choices: [
      'generate component',
    ]
  }])

  const { shot } = answers

  switch (shot) {
    case 'generate component':
      generateComponent()
      break
    default:
      return
  }


})()
