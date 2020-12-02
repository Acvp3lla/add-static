const fs = require('fs')
const path = require('path')
const {spawn} = require('child_process')

function getState(){
    const files = fs.readFileSync(process.cwd())
    const isPackageJson = files.includes('package.json')
    return isPackageJson
}

function getPath(){
    const directory = process.cwd()
    const packageJson = 'package.json'
    const pathToPackageJson = path.join(directory, packageJson)

    return pathToPackageJson
}

function parse(pathToPackageJson){
    
    const data = fs.readFileSync(pathToPackageJson)

    const parsed = JSON.parse(data)
    return parsed
}

function addScript(data, script){
    const packageJson = Object.assign({}, data, {scripts: {...data.scripts, ...script}})
    return packageJson    
}

function installDevDependencies(npm, config, packages){
    // Installs a package as a developer dependepency
    const flattenedPackages = packages.join(" ")
    console.log(flattenedPackages)
    const install = spawn(npm, ['install', flattenedPackages, '--save-dev'], config)

    install.stdout.pipe(process.stdout)
    
    install.stderr.pipe(process.stderr)

    process.stdin.pipe(install.stdin)
}

module.exports = {
    getState,
    parse, 
    getPath,
    addScript,
    installDevDependencies
}