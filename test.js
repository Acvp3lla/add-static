const {spawn} = require('child_process')

console.log(process.cwd())

const npx = spawn('npx.cmd', ['eslint', '--init'], {cwd: process.cwd(), env: process.env})

npx.stdout.pipe(process.stdout)
npx.stderr.pipe(process.stderr)

process.stdin.pipe(npx.stdin)

npx.on('error', (error) => {
    console.log(error)
})

npx.on('close', () => {
    console.log('Finished.')
})

