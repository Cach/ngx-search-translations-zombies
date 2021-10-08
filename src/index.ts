import fs from 'fs';
import { Config, TranslationExclude } from './types';
import { readFiles, readJsonFile, writeOutputFile } from './utils/filesystem.utils';
import { makeRegExp } from './utils/regexp.utils';
import { readTranslations } from './utils/translations.utils';

const CONFIG_FILE = '.zombiesconfig';

let config: Config = {
  searchDir: './src',
  searchExtensions: ['.html'],
  showEmptyKeys: false,
  showTotalCount: false,
  translationFile: './translation.json'
};

const loadConfig = (): Promise<Config> => {
  return new Promise((resolve, reject) => {
    const config = readJsonFile<Config>(CONFIG_FILE);

    if (config) {
      resolve(config);
    }

    reject(`File ${ CONFIG_FILE } is empty or not exist`);
  });
};

const searchInFile = (filename: string, text: string) => {
  return new Promise((resolve) => {
    try {
      const fileData = fs.readFileSync(filename, 'utf8');

      const result = fileData?.toString().match(makeRegExp(text));

      resolve(result);
    } catch (e) {
      resolve(false);
    }
  });
};

const searchZombies = (): Promise<string[]> => {
  return new Promise(async (resolve) => {
    const files = await readFiles(config.searchDir, config.searchExtensions);

    const exclude: TranslationExclude = {
      keys: config.excludeKeys || [],
      keysStarts: config.excludeKeysStarts || [],
      keysEnds: config.excludeKeysEnds || []
    };

    const translations = await readTranslations(config.translationFile, exclude);

    const zombies = [];

    for (const translateKey of translations) {
      const search = files.map(async (file) => {
        const isFound = await searchInFile(file, translateKey);

        if (isFound) {
          return true;
        }
      });

      const exist = (await Promise.all(search)).some((item) => item);

      if (!exist) {
        zombies.push(translateKey);
      }
    }

    resolve(zombies);
  })
};

const run = async(): Promise<void> => {
  try {
    config = await loadConfig();
  } catch (e: any) {
    throw new Error(e);
  }

  const zombies = await searchZombies();

  if (config.outputFile) {
    writeOutputFile(config.outputFile, zombies);
  }

  if (config.showEmptyKeys) {
    zombies.forEach((key) => console.log(key));
  }

  if (config.showTotalCount) {
    console.log(`Total: ${zombies.length}`);
  }
};

run();
