import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
export class Resource {
    path;
    _hash;
    _buffer;
    constructor(path) {
        this.path = resolve(import.meta.dirname, path);
    }
    get hash() {
        this._hash ??= createHash("sha1").update(this.buffer).digest("hex");
        return this._hash;
    }
    get buffer() {
        this._buffer ??= readFileSync(this.path);
        return this._buffer;
    }
}
