module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        sendMePhone: __dirname + "/src/sendMePhone.ts"
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