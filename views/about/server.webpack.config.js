const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        about: __dirname + "/src/server.tsx"
    },
    output: {
        path: __dirname + '/serverDist',
        library: {
            type: "commonjs"
        }
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".d.ts"]
    },
    module: {
        rules: [
            {test: /\.(ts|tsx|d.ts)$/, use: "ts-loader"},
            {test: /\.(js|jsx)$/, use: 'babel-loader',},
            {test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader']},
            {test: /\.eot$/i, use: 'url-loader'},
            {test: /\.(woff|svg|ttf)$/i, use: 'file-loader'}
        ],
    },
    plugins: [new MiniCssExtractPlugin({filename: "styles.css"})]
};