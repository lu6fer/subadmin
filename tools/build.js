import webpack from 'webpack';
import clean from './common/clean';
import webpackProdConfig from '../webpack.prod.config.babel';

/**
 * Build application
 *
 * @return {Promise}
 */
function bundle() {
    return new Promise((resolve, reject) => {
        webpack(webpackProdConfig, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            console.log(stats.toString({ chunks: false, colors: true }));

            resolve();
        });
    });
}

export default function build() {
    return clean().then(bundle);
}
