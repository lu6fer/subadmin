import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.config';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

const webConf = merge(common, {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        './src/entry/main.js'
    ],

    devtool: 'source-map',

    plugins: [
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('development') }
        }),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});

console.log(webConf.resolve.alias);
export default webConf;
