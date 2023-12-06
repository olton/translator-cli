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

+ `--apikey`, `-a` - specify the Google translation API key
+ `--from`, `-f` - specify source language, default is en
+ `--to`, `-t` - specify target language, default is uk
+ `--str`, `-s` - translate string
+ `--text`, `-x` - translate text file, specify file name with it
+ `--json`, `-j` - translate json file, specify file name with it
+ `--out`, `-o` - specify output file name for --json, --text inputs
+ `--help`, `-h` - show help

Copyright 2023 by Serhii Pimenov. Licensed under MIT license.