"use strict";
/**
 * Created by allen on 2016/11/9.
 */
const gutil = require('gulp-util');
const chalk = require('chalk');
const fileSize = require('filesize');
function tinypngLogger(params) {
    const { fileName, beforeSize, afterSize } = params;
    const reducedSize = beforeSize - afterSize;
    const reducedRatio = Math.round(reducedSize / beforeSize * 100) || 0;
    gutil.log(`${chalk.green('✔ ')} ${fileName} ${chalk.gray(' ->')} before = ${chalk.yellow(fileSize(beforeSize))} after = ${chalk.cyan(fileSize(afterSize))} reduced = ${chalk.green.underline(fileSize(reducedSize))} (${reducedRatio}%)`);
}
exports.tinypngLogger = tinypngLogger;
function tinypngErrorLogger(params) {
    const { fileName, errorMessage } = params;
    gutil.log(`${chalk.red('✘ ')} ${chalk.red(fileName)} errorMessage = ${chalk.red(errorMessage)}`);
}
exports.tinypngErrorLogger = tinypngErrorLogger;
//# sourceMappingURL=cli.js.map