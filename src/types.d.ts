export interface Config {
  translationFile: string;
  searchDir: string;
  searchExtensions: string[];
  showEmptyKeys?: boolean;
  showTotalCount?: boolean;
  outputFile?: string | null;
  excludeKeys?: string[];
  excludeKeysStarts?: string[];
  excludeKeysEnds?: string[];
}

export interface Translation {
  [key: string]: Translation | string;
}

export interface TranslationExclude {
  keys: string[];
  keysStarts: string[];
  keysEnds: string[];
}

export type Content = (string|string[])[];
