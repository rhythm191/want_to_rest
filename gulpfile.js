const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const { version } = require("./package.json");

const $ = gulpLoadPlugins();

gulp.task("manifest", () => {
  return gulp
    .src("src/manifest.json")
    .pipe($.jsonEditor({ version: version }))
    .pipe(gulp.dest("build"));
});

gulp.task("html", () => {
  return gulp.src("src/**/*.html").pipe(gulp.dest("build"));
});

gulp.task("image", () => {
  return gulp.src("src/**/*.png").pipe(gulp.dest("build"));
});

gulp.task("clean", () => {
  return del(["build"]);
});

gulp.task("default", gulp.series(gulp.parallel("manifest", "html", "image")));

gulp.task("watch", function() {
  gulp.watch(["src/**/*.js", "src/**/*.scss"], gulp.task("webpack"));
  gulp.watch("src/manifest.json", gulp.task("manifest"));
  gulp.watch("src/**/*.html", gulp.task("html"));
  gulp.watch("src/**/*.png", gulp.task("image"));
});
