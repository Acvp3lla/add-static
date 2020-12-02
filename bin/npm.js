function getNPM(){
    return /^win/.test(process.platform) ? 'npm.cmd' : 'npm'
}

function getNPX(){
    return /^win/.test(process.platform) ? 'npx.cmd' : 'npx'
}

const npm = getNPM()
const npx = getNPX()

module.exports = {
    npm,
    npx
}