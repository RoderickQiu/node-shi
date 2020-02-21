/***
 * Global 
 */

'use strict';

const timestring = require('./timestring/index')
const ChineseNumber = require('chinese-numbers-converter');
let toNumber = require("english2number");
let pinyin = require('js-pinyin');
pinyin.setOptions({ checkPolyphone: false, charCase: 1 });

const ENGLISH_NUMBER_REGEX = /(((?<=\s|^)(zero|one|ten|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|onillion|decillion|twenty|twelve|two|three|thirteen|thirty|fourteen|fourty|four|fifteen|fifty|five|sixty|sixteen|six|seventeen|seventy|seven|eighty|eighteen|eight|ninety|nineteen|nine)|((?<=zero|one|ten|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|onillion|decillion|twenty|twelve|two|three|thirteen|thirty|fourteen|fourty|four|fifteen|fifty|five|sixty|sixteen|six|seventeen|seventy|seven|eighty|eighteen|eight|ninety|nineteen|nine)(\s{0,}|-|s)))+)/gi;
const POSITIVE_ARABIC_NUMBER_REGEX = /^\d+(\.\d+)?$/; //non-negative floats & integers
const NEGATIVE_ARABIC_NUMBER_REGEX = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //negative floats

function isNumber(val) {
    if (POSITIVE_ARABIC_NUMBER_REGEX.test(val) || NEGATIVE_ARABIC_NUMBER_REGEX.test(val)) {
        return true;
    } else {
        return false;
    }
}

/***
 * Func 1: Human time -> time in Arabic number
 */

function englishConverter(str) {
    if (isNumber(str)) {
        return str;
    } else {
        try {
            let replaced = str.replace(/-/gi, ' ').replace(/s(?=\s)/gi, '').replace(/(?<=\s|^)(and|&)(?=\s|$)/gi, ' ').replace(/(?<=\s|^)(an|a)(?=\s|$)/gi, ' one ');//delete unnecessary things
            return replaced.replace(
                ENGLISH_NUMBER_REGEX,
                match => {
                    try {
                        return toNumber(match.replace(/[,\ss]{0,}(?=$)/gi, ''));//delete blanks and unnecessary 's's in the end
                    }
                    catch {
                        return match;
                    }
                }
            );//find and replace and the english numbers
        }
        catch {
            return str;
        }
    }
}

function unitConverter(str, treatNumberAs) {
    switch (treatNumberAs) {
        case "h":
            return str * 3600;
        case "min":
            return str * 60;
        case "s":
            return str;
        case "ms":
            return str / 1000;
        default:
            return str;
    }
}

/**
 * human time (中文/English) parsed to Arabic number in seconds.
 * @param {*} str The string or the time in different unixes.
 * @param {String} treatNumberAs (optional, only used when the input is an integer) available values: h, min, s, ms
 * @returns {Number} The converted number
 */
function humanTimeParser(str, treatNumberAs) {
    if (isNumber(str)) {//number only
        if (treatNumberAs) return unitConverter(str, treatNumberAs);
        else return str;
    } else {
        try {
            str = pinyin.getFullChars(new ChineseNumber(englishConverter(str)).toArabicString());// to make it available for cn/en time
            return timestring(str);
        }
        catch (e) {
            console.log(e);
            return;
        }
    }
}

exports.humanTimeParser = humanTimeParser;
