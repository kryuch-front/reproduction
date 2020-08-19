const gulp = require("gulp");
const pluginError = require("plugin-error");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");
const webpackBuildConfig = require("./webpack-build.config.js");
const beautifier = require("gulp-jsbeautifier");

gulp.task("webpack-dev-server", function () {
    var compiler = webpack(webpackConfig);

    new webpackDevServer(compiler, {
        hot: true,
        open: true
    }).listen(8081, "localhost", function (err) {
        if (err) throw new pluginError("webpack-dev-server", err);
    });
});

gulp.task("build", () =>
  gulp.src(["./src/index.js"])
    .pipe(webpackStream(webpackBuildConfig))
    .pipe(beautifier({
      indent_inner_html: true,
      indent_size: 4,
      unformatted: [],
      content_unformatted: [],
      inline: [],
      extra_liners: []
    }))
    .pipe(gulp.dest('./build'))
);