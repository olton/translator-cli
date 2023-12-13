#!/usr/bin/env node
import translate from "translate";
import getArguments from "./helpers/args.js"
import fs from "fs"
import isObject from "./helpers/is-object.js";

const readJSON = (file) => JSON.parse(fs.readFileSync(file, {encoding: "utf8"}))
const readFile = (file) => fs.readFileSync(file, {encoding: "utf8"})
const fileName = (str) => str.split(/(\\|\/)/g).pop()

const config = fs.existsSync('./config.json') ? readJSON('./config.json') : {}

const args = getArguments()
const showHelp = () => {
    console.log(`Use: translate [...arguments]`)
    console.log(`--apikey - specify google translate api key`)
    console.log(`--from - specify source language, default is en`)
    console.log(`--to - specify target language, default is uk`)
    console.log(`--str - translate string`)
    console.log(`--text - translate text file, specify file name with it`)
    console.log(`--json - translate json file, specify file name with it`)
    console.log(`--out - specify output file name for --json, --text inputs`)
    console.log(`--help - show this help`)
    console.log(`--version - show translator version`)
    console.log(`Example: translate --apikey XXX --from en --to uk --str "Hi there!"`)
    process.exit(0)
}

const showVersion = () => {
    console.log(`Translator v1.0.7. Copyright 2023 by Serhii Pimenov. All Rights Reserved.`)
}

if (!args) {
    showHelp()
}

const {from = 'en', to = 'uk', str, text, json, out, apikey} = args

if (Object.keys(args).includes('help')) {
    showHelp()
    process.exit(0)
}

if (Object.keys(args).includes('version')) {
    showVersion()
    process.exit(0)
}

if (!text && !json && !str) {
    console.log(`Nothing to translate! Use keys --text, --json or --str to set source.`)
    process.exit(0)
}

if (!apikey && !config.key) {
    console.log(`API key required! Please, use argument --apikey to specify one.`)
    process.exit(0)
}

translate.engine = 'google'
translate.key = apikey || config.key

let chars = {count: 0}

const translateObj = async (src, counter) => {
    for(let key in src) {
        if (isObject(src[key])) {
            await translateObj(src[key], counter)
        } else {
            if (typeof src[key] === "string") {
                counter.count += src[key].length
                src[key] = await translate(src[key], {from, to})
            }
        }
    }
}

if (str) {
    chars.count += str.length
    const result = await translate(str, {from, to})
    console.log(result)
} else if (json) {
    try {
        const jsonObj = readJSON(json)
        await translateObj(jsonObj, chars)
        fs.writeFileSync(out ? out : `${to}.${fileName(json)}`, JSON.stringify(jsonObj, null, 2))
    } catch (e) {
        console.log(e.message)
    }
} else if (text) {
    try {
        const textObj = readFile(text)
        chars.count += textObj.length
        const result = await translate(textObj, {from, to})
        fs.writeFileSync(out ? out : `${to}.${fileName(text)}`, result)
    } catch (e) {
        console.log(e.message)
    }
}

console.log(`Chars translated...${chars.count}`)
