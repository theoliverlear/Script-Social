const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        // Scripts
        './src/main/resources/static/script/globalScript.ts',
        './src/main/resources/static/script/homeScript.ts',
        './src/main/resources/static/script/imageUploadScript.ts',
        './src/main/resources/static/script/authorizeScript.ts',
        './src/main/resources/static/script/profileScript.ts',
        './src/main/resources/static/script/welcomeScript.ts',
        './src/main/resources/static/script/postScript.ts',
        './src/main/resources/static/script/createScript.ts',
        './src/main/resources/static/script/messageScript.ts',
        // Models
        './src/main/resources/static/script/models/WelcomeProfile.ts',
        './src/main/resources/static/script/models/ProfileIntention.ts',
        './src/main/resources/static/script/models/EmploymentStatus.ts',
        './src/main/resources/static/script/models/PromptMovement.ts',
        './src/main/resources/static/script/models/Post.ts',
        './src/main/resources/static/script/models/Interest.ts',
        './src/main/resources/static/script/models/UserProfile.ts',
        './src/main/resources/static/script/models/AuthType.ts',
        './src/main/resources/static/script/models/AuthPopup.ts',
        './src/main/resources/static/script/models/Comment.ts',
        './src/main/resources/static/script/models/InstantMessage.ts',

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