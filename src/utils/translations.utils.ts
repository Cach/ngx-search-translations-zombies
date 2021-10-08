import { Content, Translation, TranslationExclude } from '../types';
import { readJsonFile } from './filesystem.utils';

export const makeTranslationKey = (data: Translation, parentKey = ''): Content => {
  return Object.keys(data).map((key) => {
    const value = data[key];

    if (typeof value === 'string') {
      if (parentKey?.length) {
        return `${ parentKey }.${ key }`;
      }

      return key;
    }

    const prefix = parentKey?.length ? `${ parentKey }.${ key }` : key;

    return makeTranslationKey(value, prefix).flat();
  });
}

export const readTranslations = (file: string, exclude: TranslationExclude): Promise<string[]> => {
  return new Promise((resolve) => {
    const dataJson = readJsonFile<Translation>(file);

    if (!dataJson) {
      throw new Error('File is empty');
    }

    const translations = makeTranslationKey(dataJson).flat();

    if (exclude.keys?.length || exclude.keysEnds?.length || exclude.keysStarts?.length) {
      const filtered = translations.filter((item: string) => {
        return !exclude.keys?.includes(item)
          && exclude.keysStarts?.every((start) => !item.startsWith(start))
          && exclude.keysEnds?.every((end) => !item.endsWith(end));
      });

      resolve(filtered);

      return;
    }

    resolve(translations);
  });
};
