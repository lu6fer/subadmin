import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.config';

const webConf = merge(common, {
    entry: './src/entry/main.js',

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]
});

console.log(webConf.resolve.alias);

export default webConf;
