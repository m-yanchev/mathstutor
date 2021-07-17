module.exports = {
    mode: 'production',
    entry: {
        bundle: __dirname + "/src/client.js"
    },
    output: {
        path: __dirname + '/clientDist'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
        }, {
            test: /\.css$/i,
            use: ["css-loader"]
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
    }
};