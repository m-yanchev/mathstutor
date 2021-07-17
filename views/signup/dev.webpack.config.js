const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        bundle: __dirname + "/src/client.tsx"
    },
    output: {
        path: __dirname + '/devDist',
        clean: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {test: /\.(ts|tsx)$/, use: "ts-loader"},
            {test: /\.(js|jsx)$/, use: 'babel-loader'},
            {test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"]}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'devDist'),
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({filename: "styles.css"})
    ]
}