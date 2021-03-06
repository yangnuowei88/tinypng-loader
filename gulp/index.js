"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const through = require('through2');
const gulp_util_1 = require('gulp-util');
const index_1 = require('../libs/index');
const cli_1 = require('../libs/cli');
const PLUGIN_NAME = 'gulp-tinypng';
function bufferOnly(callback) {
    let totalSize = 0;
    let optimizedSize = 0;
    function decorateTransformCallback(file, transformCallback) {
        totalSize += file.stat.size;
        return () => {
            optimizedSize += file.contents.length;
            transformCallback(null, file);
        };
    }
    return () => through.obj((file, encoding, cb) => {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new gulp_util_1.PluginError(PLUGIN_NAME, 'index.ts: tinypng does not support stream'));
            return callback(null, file);
        }
        else if (file.isBuffer()) {
            callback(file, encoding, decorateTransformCallback(file, cb));
        }
    }, () => {
        cli_1.tinypngLogger({
            fileName: `SUMMARY`,
            beforeSize: totalSize,
            afterSize: optimizedSize
        });
    });
}
const gulpTinyPng = bufferOnly((file, encoding, cb) => __awaiter(this, void 0, void 0, function* () {
    const contents = file.contents;
    const fileName = file.relative;
    file.contents = (yield index_1.default(contents, fileName)) || contents;
    cb();
}));
module.exports = gulpTinyPng;
//# sourceMappingURL=index.js.map