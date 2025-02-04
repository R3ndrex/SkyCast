const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

const config = merge(common, {
    mode: "development",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        open: true,
    },
});
module.exports = config;
