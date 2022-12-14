const tsConfig = require('./tsconfig.json')
const tsConfigPaths = require('tsconfig-paths')

// Either absolute or relative path. If relative it's resolved to current
// working directory.
const baseUrl = './server'
tsConfigPaths.register({
	baseUrl,
	paths: tsConfig.compilerOptions.paths
})
tsConfigPaths.loadConfig('./tsconfig.json')
