const {setupListeners} = require('./process')
const {spawn} = require('child_process')

function createConfig(spawnConfig, npx){
    const eslint = spawn(npx, ['eslint', '--init'], spawnConfig)
    
    eslint.stdout.pipe(process.stdout)
    eslint.stderr.pipe(process.stderr)
    setupListeners(eslint)
    process.stdin.pipe(eslint.stdin)

}

module.exports = {
    createConfig
}