# NgxSearchTranslationsZombies

The library for searching a zombies translations

[![NPM Version](https://img.shields.io/npm/v/ngx-search-translations-zombies)](https://www.npmjs.com/package/ngx-search-translations-zombies)
[![NPM Size](https://img.shields.io/bundlephobia/min/ngx-search-translations-zombies?color=successg)](https://www.npmjs.com/package/ngx-search-translations-zombies)

## Install

```bash
$ npm install ngx-search-translations-zombies --save-dev
```

 - create config file

```bash
$ touch .zombiesconfig
```

 - add command to package.json (JSON format):

```bash
"scripts": {
    "zombies": "node /node_modules/ngx-search-translations-zombies/build/"
}
```

## Usage

```bash
npm run zombies
```

## Configuration

| Key | Value | Required | Description |
| --- | --- | --- | --- |
| translationFile | string | yes | path to file with translations |
| searchDir | string | yes | path to dir for search keys of translation |
| searchExtensions | string[] | yes | files extensions in which should be searched keys of translation
| showEmptyKeys | boolean | no | show zombies keys in console |
| showTotalCount | boolean | no | show total of searched zombies keys |
| outputFile | string | no | path to file where result should be written |
| excludeKeys | string[] | no | keys for skipping |
| excludeKeysStarts | string[] | no | keys beginning with these lines will be skipped  |
| excludeKeysEnds | string[] | no | keys, ends ending with these lines will be skipped |

#### Example

```json
{
  "translationFile": "./src/assets/translations/en.json",
  "searchDir": "./src",
  "searchExtensions": [".ts", ".html"],
  "showEmptyKeys": true,
  "showTotalCount": true,
  "outputFile": "./zombies_translations.txt",
  "excludeKeys": [
    "user.gender.other"
  ],
  "excludeKeysStarts": [
    "user.types."
  ],
  "excludeKeysEnds": [
    ".notices.save"
  ]
}

```
