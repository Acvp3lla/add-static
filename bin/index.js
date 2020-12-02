#!/usr/bin/env node

const {join} = require('path')
const {readdirSync} = require('fs')
const {spawn} = require("child_process")
const {npm, npx} = require('./npm')
const eslint = require('./eslint')
const package = require('./package')
const {init} = require('./inquire')

function main(){
    
    const config = {
        cwd: process.cwd(),
        env: process.env
    }

    const dir = process.cwd()

    const files = readdirSync(dir, config)
    
    const isApp = files.includes('package.json')
    
    if(isApp){
        package.installDevDependencies(npm, config, ['eslint prettier'])
        // add configs
        
    }else{
        init(npm, config).then(() => {
          package.installDevDependencies(npm, config, ['eslint', 'prettier'])  
        })        
        // ask if user would like to initialize project
        // if yes
        // initialize project by adding project.json
        // add dependencies
        // add configs
    }

}

main()








