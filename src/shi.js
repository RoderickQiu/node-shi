/***
 * Global 
 */

'use strict';

const timestring = require('./timestring/index')
const ChineseNumber = require('chinese-numbers-converter');
let toNumber = require("english2number");
let pinyin = require('js-pinyin');
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });

const ENGLISH_NUMBER_REGEX = /(((?<=\s|^)(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|onillion|decillion)|(?<=zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|onillion|decillion)(\s|-))+)/gi;
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
            str = str.replace(/-/gi, ' ').replace(/and/gi, '');//delete '-' and unnecessary 'and's
            return str.replace(
                ENGLISH_NUMBER_REGEX,
                match => {
                    return toNumber(match.replace(/[,\s|s](?=$)/i, ''));//delete blanks and unnecessary 's's in the end
                }
            );//find and replace and the english numbers
        }
        catch (e) {
            console.log(e);
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
 * human time parsed to Arabic number in seconds.
 * @param {*} str The string or the time in different unixes.
 * @param {String} treatNumberAs (optional) h, min, s, ms
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
