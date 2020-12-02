const {prompt} = require('inquirer')
const {spawn} = require('child_process')

function init(npm, config){
    const questions =  new Promise((resolve, reject) => {
        const choices = ['Yes', 'No']
        prompt([
            {type: 'list', name: 'init', message: 'Would you like to initialize a new project?', choices: choices}
        ]).then((answer) => {
            const shouldInit = answer.init
    
            if(shouldInit === choices[0]){
                console.log(`Initializing new project..`)
                const npmInit = spawn(npm, ['init', '-y'], config)
    
                npmInit.on('error', (err) => {
                    console.log(`${err}`)
                })
    
                npmInit.stdout.pipe(process.stdout)
                npmInit.stderr.pipe(process.stderr)
                process.stdin.pipe(npmInit.stdin)

            }
            resolve("Project has successfully been initialized")
        }).catch((err) => {
            if(err.isTtyError){
                return console.log(`Couldn't be rendered in current environment`)
            }
            reject("Error during setup")
            return console.log(`Something went wrong attempting to initialize a new project: ${err}`)
        })

    })
    
    return questions
}

module.exports = {
    init
}
