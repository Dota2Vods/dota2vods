var path = require('path'),
    webpack = require("webpack"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env["NODE_ENV"] === "production";

const config = {
    entry: ["babel-polyfill", path.resolve(__dirname, "src", "index.js")],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/"
    },
    devServer: {
         contentBase: "build/",
         historyApiFallback: {
             index: "/404.html"
         }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract([
                    {
                        loader: "css-loader",
                        options: {
                            minimize: production,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true
                        }
                    }
                ])
            },
            {
                test: /\.md$/,
                use: [
                    "html-loader", "markdown-loader"
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|jpg|gif|png)$/,
                loader: "file-loader",
                options: {
                    outputPath: "assets/",
                    publicPath: "assets/",
                }
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin(),
        //Extract css
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: "source-map"
};

//Additional settings if this is a production build
if (production) {
    config.plugins.push(
        //let react know we compile for production
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // Minify javascript
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    );
}

module.exports = config;
