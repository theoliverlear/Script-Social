const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/main/resources/static/script/globalScript.ts',
        './src/main/resources/static/script/homeScript.ts',
        './src/main/resources/static/script/authorizeScript.ts',
        './src/main/resources/static/script/profileScript.ts',
        './src/main/resources/static/script/welcomeScript.ts',
        './src/main/resources/static/script/WelcomeProfile.ts',
        './src/main/resources/static/script/ProfileIntention.ts'
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader', // Add Babel Loader
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ]
                        }
                    },
                    'ts-loader' // Keep using ts-loader for TypeScript transpilation
                ]
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static/script'),
    },
    mode: 'development',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};