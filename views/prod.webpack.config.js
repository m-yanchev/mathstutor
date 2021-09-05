const path = require('path');

module.exports = folder => ({
    mode: 'production',
    entry: {
        bundle: path.join(__dirname, folder, "src/client.tsx")
    },
    output: {
        path: path.join(__dirname, folder, "prodDist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {test: /\.(ts|tsx)$/, use: "ts-loader"},
            {test: /\.(js|jsx)$/, use: 'babel-loader'},
            {test: /\.css$/i, use: ["css-loader"]},
            {test: /\.eot$/i, use: [{loader: 'url-loader'}]},
            {test: /\.(woff|svg|ttf)$/i, use: [{loader: 'file-loader'}]}
        ],
    }
});