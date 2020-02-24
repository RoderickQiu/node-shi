# node-shi（时）

It's a lib which let you to transfer human time to computer-readable time and also to transfer computer-generated time to human time, available for English and Chinese.

[**NPM Package**](https://www.npmjs.com/package/node-shi) | [**CNPM**](https://npm.taobao.org/package/node-shi)

## How to use

```shell
# npm
npm i node-shi

# yarn
yarn add node-shi
```

```javascript
var shi = require('node-shi');

// human time -> time in Arabic number as seconds
console.log(shi.humanTimeParser("five hundreds and twenty one seconds"));//521
console.log(shi.humanTimeParser("a day and 一 hour, 52 min 16sec"));//93136
console.log(shi.humanTimeParser("三十三分钟", { to: "m" }));//33
shi.setDefault({ as: 'm' });//set default
console.log(shi.humanTimeParser("50", { to: 'h' }))//0.8333333333333334
console.log(shi.humanTimeParser("50", { as: 'h', to: 'm' }))//3000
shi.clearDefault();//clear defaults

// unit convert
console.log(shi.unitConverter(60, 'm', 'h'));//1
console.log(shi.unitConverter(1, "d", "ms"));//86400000

// time in Arabic number -> human time
console.log(shi.ArabicNumberTimeParser(1500));//25 minutes
console.log(shi.ArabicNumberTimeParser(36, { lang: 'fr', to: 'h' }));//0,01 heure
console.log(shi.ArabicNumberTimeParser(1, { lang: 'zh_CN', as: 'ms', to: 's', round: true }));//0 秒

// output the version
console.log(shi.version());//0.3.1
```

## Features

### Human time -> time in Arabic number

- Chinese number + Chinese unix -> time in Arabic number as seconds
- Chinese number + English unix -> time in Arabic number as seconds
- Arabic number + Chinese unix -> time in Arabic number as seconds
- Arabic number + English unix -> time in Arabic number as seconds
- English number + Chinese unix -> time in Arabic number as seconds
- English number + English unix -> time in Arabic number as seconds

### Time in Arabic number -> Human time

- Time with units `d, h, m (min), s, ms` to human time in languages including: `'ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 'fo', 'fr', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ko', 'lo', 'lt', 'lv', 'ms', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'uk', 'ur', 'sk', 'sv', 'tr', 'th', 'vi', 'zh_CN', 'zh_TW'`.

### Time unix translate

- Arabic number in different unixs `d, h, m (min), s, ms` -> time in Arabic number as `d, h, m (min), s, ms`

## Future of this project

For the future of node-shi, go to the [todo-list](https://github.com/RoderickQiu/node-shi/projects/1).

## Packages Using

- js-pinyin, waterchestnet, MIT License.
- timestring, mike182uk, MIT License.
- chinese-numbers-converter, anton-bot, MIT License.
- english2number, TSavo, MIT License.
- HumanizeDuration.js, EvanHahn, Unlicense.
