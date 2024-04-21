"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.engineThumbnail = exports.engineTutorialData = exports.enginePreviewData = exports.enginePlayData = exports.engineConfiguration = exports.engineInfo = exports.version = exports.uscToLevelData = exports.migrateUSC = void 0;
const Resource_cjs_1 = require("./Resource.cjs");
__exportStar(require("usctool"), exports);
var usctool_1 = require("usctool");
Object.defineProperty(exports, "migrateUSC", { enumerable: true, get: function () { return usctool_1.migrateVUSC; } });
var convert_cjs_1 = require("./convert.cjs");
Object.defineProperty(exports, "uscToLevelData", { enumerable: true, get: function () { return convert_cjs_1.uscToLevelData; } });
exports.version = '1.3.1';
exports.engineInfo = {
    name: 'pjsekai',
    version: 12,
    title: {
        en: 'Project Sekai',
        ja: 'プロセカ',
        ko: '프로젝트 세카이',
        zhs: '世界计划',
        zht: '世界計劃',
    },
    subtitle: {
        en: 'Project Sekai: Colorful Stage!',
        ja: 'プロジェクトセカイ カラフルステージ!',
        ko: '프로젝트 세카이: 컬러풀 스테이지!',
        zhs: '世界计划 彩色舞台',
        zht: '世界計畫 繽紛舞台！',
    },
    author: {
        en: 'Burrito',
    },
    description: {
        en: [
            'A recreation of Project Sekai: Colorful Stage! engine in Sonolus.',
            `Version: ${exports.version}`,
            '',
            'GitHub Repository',
            'https://github.com/NonSpicyBurrito/sonolus-pjsekai-engine',
        ].join('\n'),
    },
};
exports.engineConfiguration = new Resource_cjs_1.Resource('EngineConfiguration');
exports.enginePlayData = new Resource_cjs_1.Resource('EnginePlayData');
exports.enginePreviewData = new Resource_cjs_1.Resource('EnginePreviewData');
exports.engineTutorialData = new Resource_cjs_1.Resource('EngineTutorialData');
exports.engineThumbnail = new Resource_cjs_1.Resource('thumbnail.png');
