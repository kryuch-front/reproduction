const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    mode: "production",
    devtool: "none",
    entry: {
        main: "./src/index"
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "dist/js/[name].js"
    },
    module: {
        rules: [{
            test: /\.pug$/,
            use: ["html-loader", "pug-html-loader"]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"
            ]
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "dist/css/[name].css"
        })
    ].concat(htmlPlugins)
}