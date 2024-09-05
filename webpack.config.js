const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const { AngularWebpackPlugin } = require('@ngtools/webpack');

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
        './src/main/resources/static/script/models/ConnectionBubble.ts',
        './src/main/resources/static/script/models/HtmlGenerative.ts',
        // Angular
        // './src/main/resources/static/script/angular/script-social-app.module.ts',
        // './src/main/resources/static/script/angular/main.ts',
        // './src/main/resources/static/script/angular/polyfills.ts',
        // Angular Components
        // './src/main/resources/static/script/angular/components/nav-bar/nav-bar.component.ts',
        // './src/main/resources/static/script/angular/components/ss-footer/ss-footer.component.ts',
        // ...glob.sync('./src/main/resources/static/script/angular/**/*.ts').map(p => './' + path.relative(__dirname, p).replace(/\\/g, '/'))
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
            {
                test: /\.html\.js$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: path.resolve(__dirname, './src/main/resources/templates/scripts'),
                            publicPath: '/templates/scripts',
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
            }
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
    mode: 'production', // Set to production for optimization
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new AngularWebpackPlugin({
            tsconfig: './tsconfig.json',
            jitMode: true,  // Enable JIT mode in AngularWebpackPlugin
        })
    ]
};