const merge = require("webpack-merge");

module.exports = (baseConfig, configType) => {
    //Remove UglifyJsPlugin till it supports ES6
    baseConfig.plugins = baseConfig.plugins.filter(plugin => plugin.constructor.name !== "UglifyJsPlugin");

    const customConfig = {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        }
    }

    return merge(baseConfig, customConfig);
};
