#!/usr/bin/env node

let program = require('commander');
let createProject = require('./createProject');
let inquirer = require('inquirer')
let path = require('path')
let fs = require('fs')

// mycli create -t vue -n shop

// 非交互式
// program.version('0.0.0')
//   .option('-t, --type <name>', 'project type')
//   .option('-n, --type <name>', 'project type')
// program.command('create').action(function(name) {
//   createProject(name, program.type)
// })

// program.parse(process.argv)


// 交互式
let promptList = [
  {
    type: 'input',
    message: '设置项目名称:',
    name: 'name',
    default: 'demo' // 默认值
  }, {
    type: 'confirm',
    message: '是否使用TypeScript',
    name: 'ts',
    prefix: 'ts'
  }, {
    type: 'list',
    message: '请选择项目类型',
    name: 'type',
    // choices: [
    //   'vue',
    //   'react',
    //   'h5',
    //   'jquery',
    //   'activity'
    // ],
    choices: fs.readdirSync(path.join(__dirname, 'projects')),
    filter: function(val) {
      return val.toLowerCase()
    }
  }
]

inquirer.prompt(promptList).then(answers => {
  console.log(answers)
  createProject(answers.name, answers.type)
})