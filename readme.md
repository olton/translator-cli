# Translator
I wrote this tool when I faced the need to translate json files that had language tags into different languages.

## Install
```shell
npm i -g @olton/translator
```

## Using 
```shell
translate --apikey XXX --from en --to es --str "Hi there!"
```

## Arguments
Use: `translate [...arguments]`

+ `--apikey` - specify the Google translation API key
+ `--from` - specify source language, default is en
+ `--to` - specify target language, default is uk
+ `--str` - translate string
+ `--text` - translate text file, specify file name with it
+ `--json` - translate json file, specify file name with it
+ `--out` - specify output file name for --json, --text inputs
+ `--help` - show help

Copyright 2023 by Serhii Pimenov. Licensed under MIT license.