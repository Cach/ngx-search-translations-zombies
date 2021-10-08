import fs from 'fs';
import path from 'path';
import { Content } from '../types';

export const readJsonFile = <T = any>(filename: string): T | null => {
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (e) {
    return null;
  }
}

export const readDir = (startPath: string, filter: string[]): Content => {
  if (!fs.existsSync(startPath)) {
    return [];
  }

  const files = fs.readdirSync(startPath);

  return files.map((file) => {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      return readDir(filename, filter).flat();
    } else if (filter.includes(path.extname(filename))) {
      return filename;
    } else {
      return [];
    }
  });
};

export const readFiles = (dir: string, extensions: string[]): Promise<string[]> => {
  return new Promise((resolve) => {
    const files = readDir(dir, extensions).flat();

    resolve(files);
  });
};

export const writeOutputFile = (filename: string, data: string[]): void => {
  if (!filename) {
    return;
  }

  const content = data.join('\n');

  try {
    fs.writeFileSync(filename, content)
  } catch (err) {
    console.error(err)
  }
};
