import { Content, Translation, TranslationExclude } from '../types';
export declare const makeTranslationKey: (data: Translation, parentKey?: string) => Content;
export declare const readTranslations: (file: string, exclude: TranslationExclude) => Promise<string[]>;
