const path = require('path');

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        api: path.join(__dirname, 'src/index.ts')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        library: {
            type: "commonjs"
        }
    },
    module: {
        rules: [{test: /\.(ts|tsx)$/, use: "ts-loader"}, {test: /\.(js|jsx)$/, use: 'babel-loader'}]
    }
}