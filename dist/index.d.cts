import { Resource } from './Resource.cjs';
export * from 'usctool';
export { migrateVUSC as migrateUSC } from 'usctool';
export { uscToLevelData } from './convert.cjs';
export declare const version = "1.3.1";
export declare const engineInfo: {
    readonly name: "pjsekai";
    readonly version: 12;
    readonly title: {
        readonly en: "Project Sekai";
        readonly ja: "プロセカ";
        readonly ko: "프로젝트 세카이";
        readonly zhs: "世界计划";
        readonly zht: "世界計劃";
    };
    readonly subtitle: {
        readonly en: "Project Sekai: Colorful Stage!";
        readonly ja: "プロジェクトセカイ カラフルステージ!";
        readonly ko: "프로젝트 세카이: 컬러풀 스테이지!";
        readonly zhs: "世界计划 彩色舞台";
        readonly zht: "世界計畫 繽紛舞台！";
    };
    readonly author: {
        readonly en: "Burrito";
    };
    readonly description: {
        readonly en: string;
    };
};
export declare const engineConfiguration: Resource;
export declare const enginePlayData: Resource;
export declare const enginePreviewData: Resource;
export declare const engineTutorialData: Resource;
export declare const engineThumbnail: Resource;
