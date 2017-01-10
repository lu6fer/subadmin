import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import assets from 'postcss-assets';
import autoprefixer from 'autoprefixer';
import config from './config.json';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

export default {
    output: {
        path: path.resolve(__dirname, config.buildDir),
        publicPath: '/',
        filename: '[name].js',
        sourceMapFilename: 'maps/[file].map'
    },

    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.ejs', favicon: 'src/favicon.ico', inject: false })
    ],

   /* externals: {
        'Configuration': './src/config/config.dev.js'
    },*/

    resolve: {
        alias: {
            'createjs-preloadjs$': 'createjs-preloadjs/lib/preloadjs-0.6.2.combined.js',
            modernizr: path.resolve(__dirname, '.modernizrrc'),
            actions: path.resolve(__dirname, 'src/app/actions'),
            components: path.resolve(__dirname, 'src/app/components'),
            constants: path.resolve(__dirname, 'src/app/constants'),
            containers: path.resolve(__dirname, 'src/app/containers'),
            reducers: path.resolve(__dirname, 'src/app/reducers'),
            store: path.resolve(__dirname, 'src/app/store'),
            utils: path.resolve(__dirname, 'src/app/utils'),
            config$ : path.resolve(__dirname, 'src/app/config/config.' + env + '.js')
        }
    },

    module: {
        preLoaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.(eot|woff(2)?|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name]---[hash].[ext]' },
            { test: /\.(png|jpg)$/, loader: 'file?name=images/[name]---[hash].[ext]' },
            { test: /\.(mp3|mp4|webm|ogg)$/, loader: 'file?name=media/[name]---[hash].[ext]' },
            { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss' },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src', 'app'),
                    path.resolve(__dirname, 'src', 'entry')
                ],
                loaders: [
                    'style',
                    'css?importLoaders=1&modules&localIdentName=[local]---[hash:base64:5]',
                    'postcss',
                    'sass',
                    'sass-resources'
                ]
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src', 'assets', 'scssSprite'),
                loader: 'file?name=cssSprite/[name]---[hash].css!postcss!sass!sass-resources'
            },
            { test: /\.modernizrrc$/, loader: 'modernizr' },
            { test: /createjs-preloadjs/, loader: 'imports?this=>global!exports?window.createjs' },
            { test: /gsap/, loader: 'exports?window' }
        ]
    },

    postcss() {
        return [assets, autoprefixer({ browsers: config.autoprefixer })];
    },

    sassResources: path.resolve(__dirname, 'src', 'entry', 'style', 'shared', 'shared.scss')
};
