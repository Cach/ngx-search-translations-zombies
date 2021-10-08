import { Content } from '../types';
export declare const readJsonFile: <T = any>(filename: string) => T | null;
export declare const readDir: (startPath: string, filter: string[]) => Content;
export declare const readFiles: (dir: string, extensions: string[]) => Promise<string[]>;
export declare const writeOutputFile: (filename: string, data: string[]) => void;
