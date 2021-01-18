const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const webpack = require("webpack");
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin(),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            })
            // new webpack.IgnorePlugin({
            //     resourceRegExp: /.*/,
            //     contextRegExp: /moment$/
            // })
            // new webpack.IgnorePlugin(/.*/, /\@ant-design$/)
        ],
        resolve: {
            alias: {
                "@ant-design/icons/lib/dist$": resolve(
                    "src/assets/antdIcons.js"
                )
            }
        }
    }
};
