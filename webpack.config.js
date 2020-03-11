const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.s[ac]ss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            { test: /\.js$/, loader: "source-map-loader" }

        ]
    }
};
