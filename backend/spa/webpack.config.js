module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        spa: __dirname + "/src/server.ts"
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