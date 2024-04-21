/// <reference types="node" />
export declare class Resource {
    readonly path: string;
    private _hash;
    private _buffer;
    constructor(path: string);
    get hash(): string;
    get buffer(): Buffer;
}
