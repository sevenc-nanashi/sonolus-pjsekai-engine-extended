"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
class Resource {
    constructor(path) {
        this.path = (0, node_path_1.resolve)(__dirname, path);
    }
    get hash() {
        this._hash ??= (0, node_crypto_1.createHash)('sha1').update(this.buffer).digest('hex');
        return this._hash;
    }
    get buffer() {
        this._buffer ??= (0, node_fs_1.readFileSync)(this.path);
        return this._buffer;
    }
}
exports.Resource = Resource;
