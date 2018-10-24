/**
 * 选择执行哪个脚本
 */

import * as fs from 'fs'
import * as path from 'path'
import * as inquirer from 'inquirer'

inquirer
  .prompt([{
    type: 'rawlist',
    name: 'shot',
    message: 'please choose one arrow to shot',
    choices: [
      'generateComponent',
    ]
  }])
  .then(async answers => {

    const { shot } = answers

    
  })