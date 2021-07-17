const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        about: __dirname + "/src/server.js"
    },
    output: {
        path: __dirname + '/serverDist',
        library: {
            type: "commonjs"
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
        }, {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }, {
            test: /\.eot$/i,
            use: [{
                loader: 'url-loader'
            }]
        }, {
            test: /\.(woff|svg|ttf)$/i,
            use: [{
                loader: 'file-loader'
            }]
        }],
    },
    plugins: [new MiniCssExtractPlugin({filename: "styles.css"})]
};