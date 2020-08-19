const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            filename: `${name}.html`
        });
    });
}

const htmlPlugins = generateHtmlPlugins("./src/pages");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/index"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.pug$/,
            use: ["html-loader", "pug-html-loader"]
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    },
    plugins: [].concat(htmlPlugins)
};