module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        ssr: "./src/index.js"
    },
    output: {
        library: {
            type: "commonjs"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
        ],
    }
};