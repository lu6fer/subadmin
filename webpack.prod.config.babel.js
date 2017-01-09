import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.config.babel';

export default merge(common, {
    entry: './src/entry/main.js',

    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            minimize: true,
            compress: {
                drop_debugger: true,
                warnings: false,
                drop_console: true
            }
        })
    ]
});
