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
        './src/main/resources/static/script/ProfileIntention.ts',
        './src/main/resources/static/script/EmploymentStatus.ts',
        './src/main/resources/static/script/PromptMovement.ts',
        './src/main/resources/static/script/imageUploadScript.ts',
        './src/main/resources/static/script/Interest.ts',
        './src/main/resources/static/script/UserProfile.ts',
        './src/main/resources/static/script/postScript.ts',
        './src/main/resources/static/script/createScript.ts'
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ]
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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