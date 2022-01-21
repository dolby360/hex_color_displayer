const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src/index.js",//path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename : "index.js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
        {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
            }
        },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    externals: {
        "react": "commonjs react",
        "react-dom": "commonjs react-dom"
     }
}