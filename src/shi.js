/***
 * Global 
 */

'use strict';

const timestring = require('./timestring/index')
const ChineseNumber = require('chinese-numbers-converter');
const humanizeDuration = require('humanize-duration');
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
 * Func 1: Default settings
 */

var DEFAULT_AS = null, DEFAULT_TO = null;

/**
 * set the default settings about `as` and `to`
 * @param {Object} def: *{ as: (d, h, m, s, ms), to: (d, h, m, s, ms) }*
 */
function setDefault(def) {
    if (def) {
        if (def.as) DEFAULT_AS = def.as;
        if (def.to) DEFAULT_TO = def.to;
    }
}

/**
 * clear the default settings about `as` and `to`
 */
function clearDefault() {
    DEFAULT_AS = null;
    DEFAULT_TO = null;
}

exports.setDefault = setDefault;
exports.clearDefault = clearDefault;

/***
 * Func 2: Units transfer
 */

/**
 * Convert things from a unit to another
 * @param {Number} number
 * @param {String} from 
 * @param {String} to 
 * @returns {Number}
 */
function unitConverter(number, from, to) {
    number = unitPreConverter(number, from);
    number = unitConverterAfter(number, to);
    return number;
}

exports.unitConverter = unitConverter;


/***
 * Func 3: Human time -> time in Arabic number
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

//dealing with 'as' (to second)
function unitPreConverter(str, as) {
    switch (as) {
        case "d":
            return str * 86400;
        case "h":
            return str * 3600;
        case "m":
            return str * 60;
        case "s":
            return str;
        case "ms":
            return str / 1000;
        default:
            return str;
    }
}

//dealing with 'to' (from second)
function unitConverterAfter(str, to) {
    switch (to) {
        case "d":
            return str / 86400;
        case "h":
            return str / 3600;
        case "m":
            return str / 60;
        case "s":
            return str;
        case "ms":
            return str * 1000;
        default:
            return str;
    }
}

/**
 * human time (中文/English) parsed to Arabic number in seconds.
 * @param {String|Number} str The string need to be parsed or the time in different unixes.
 * @param {Object} option (optional) *{ as (only used when no unix is in str): (d, h, m, s, ms), to: (d, h, m, s, ms) }*
 * @returns {Number} The converted number
 */
function humanTimeParser(str, option) {
    if (isNumber(str)) {//number only
        if (option) {
            if (option.as) str = unitPreConverter(str, option.as);
            else if (DEFAULT_AS) str = unitPreConverter(str, DEFAULT_AS);
            if (option.to) str = unitConverterAfter(str, option.to);
            else if (DEFAULT_TO) str = unitConverterAfter(str, DEFAULT_TO);
            return str;
        } else if (DEFAULT_AS | DEFAULT_TO) {
            if (DEFAULT_AS) str = unitPreConverter(str, DEFAULT_AS);
            if (DEFAULT_TO) str = unitConverterAfter(str, DEFAULT_TO);
            return str;
        } else return str;
    } else {
        try {
            str = pinyin.getFullChars(new ChineseNumber(englishConverter(str)).toArabicString());// to make it available for cn/en time
            if (option) {
                if (option.to) return unitConverterAfter(timestring(str), option.to);
                else if (DEFAULT_TO) return unitConverterAfter(timestring(str), DEFAULT_TO);
                else return str;
            } else if (DEFAULT_TO) {
                return unitConverterAfter(timestring(str), DEFAULT_TO);
            } else return timestring(str);
        }
        catch (e) {
            throw e;
        }
    }
}

exports.humanTimeParser = humanTimeParser;

/***
 * Func 4: Time in Arabic number -> Human time
 */

/***
 * Parse a time in Arabic number to semantic time
 * 
 * `lang` can be set to:
 *'ar', 'bg', 'ca', 'cs',    'da',
 *'de', 'el', 'en', 'es',    'et',
 *'fa', 'fi', 'fo', 'fr',    'hr',
 *'hu', 'id', 'is', 'it',    'ja',
 *'ko', 'lo', 'lt', 'lv',    'ms',
 *'nl', 'no', 'pl', 'pt',    'ro',
 *'ru', 'uk', 'ur', 'sk',    'sv',
 *'tr', 'th', 'vi', 'zh_CN', 'zh_TW'
 * @param {Number} number the time in Arabic number (If `as` is not defined in `option`, we'll parse the number as second in default.)
 * @param {Object} option (optional) *{ lang: language, as: (d, h, m, s, ms), to: (d, h, m, s, ms) }*
 */
function ArabicNumberTimeParser(number, option) {
    try {
        if (option) {
            if (option.as) number = unitPreConverter(number, option.as);
            else if (DEFAULT_AS) number = unitPreConverter(number, DEFAULT_AS);
        } else if (DEFAULT_AS) number = unitPreConverter(number, DEFAULT_AS);
        let result = unitConverter(number, 's', 'ms');
        if (option) {
            if (option.to) result = humanizeDuration(result, {
                units: [option.to],
                language: option.lang,
                fallbacks: ['en']
            });
            else if (DEFAULT_TO) result = humanizeDuration(result, {
                units: [DEFAULT_TO],
                language: option.lang,
                fallbacks: ['en']
            });
            else result = humanizeDuration(result, {
                language: option.lang,
                fallbacks: ['en']
            });
        } else if (DEFAULT_TO) result = humanizeDuration(result, {
            units: [DEFAULT_TO],
            language: 'en'
        });
        else result = humanizeDuration(result, { language: 'en' });
        return result;
    }
    catch (e) {
        throw e;
    }
}

exports.ArabicNumberTimeParser = ArabicNumberTimeParser;