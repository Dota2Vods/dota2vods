const path = require("path"),
      webpack = require("webpack"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      AssetsPlugin = require("assets-webpack-plugin");

const buildPath = path.resolve(__dirname, "build");
const assetsFolder = "/assets/";
const assetsPath = path.join(buildPath, assetsFolder);
const production = process.env["NODE_ENV"] === "production";

if (production) {
    //Use hashes as asset filenames in production
    var assetFileNames = {
        "js": "[chunkhash].js",
        "css": "[contenthash].css"
    }
} else {
    //Otherwise extract the old asset filenames so we don't need to rebuild the html files for every change
    const assetPaths = require("./src/getAssetPaths")(buildPath);

    var assetFileNames = {};
    Object.keys(assetPaths).map(assetType => {
        assetFileNames[assetType] = assetPaths[assetType].substr(assetsFolder.length);
    });
}

const config = {
    entry: ["babel-polyfill", path.resolve(__dirname, "src", "index.js")],
    output: {
        filename: assetFileNames["js"],
        path: assetsPath,
        publicPath: assetsFolder
    },
    devServer: {
         contentBase: buildPath,
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
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin(),
        //Extract css
        new ExtractTextPlugin({
            filename: assetFileNames["css"],
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
        //Remove old assets
        new CleanWebpackPlugin(assetsPath),
        // Minify javascript
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        //Save asset paths
        new AssetsPlugin({
            filename: "paths.json",
            path: assetsPath
        })
    );
}

module.exports = config;
