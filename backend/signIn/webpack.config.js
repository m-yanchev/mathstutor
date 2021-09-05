module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        index: __dirname + "/src/index.ts"
    },
    output: {
        path: __dirname + '/dist',
        library: {type: "commonjs"}
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {test: /\.(ts|tsx)$/, use: "ts-loader"},
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ],
    }
};