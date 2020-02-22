# node-shi（时）

It's a lib which let you to transfer human time to computer-readable time and also to transfer computer-generated time to human time, available for English and Chinese.

## Features

### Human time -> time in Arabic number

- Chinese number + Chinese unix -> time in Arabic number as seconds
- Chinese number + English unix -> time in Arabic number as seconds
- Arabic number + Chinese unix -> time in Arabic number as seconds
- Arabic number + English unix -> time in Arabic number as seconds
- English number + Chinese unix -> time in Arabic number as seconds
- English number + English unix -> time in Arabic number as seconds

### Time in Arabic number -> Human time

- Time with units `d, h, m, s, ms` to human time in languages including: `'ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fa', 'fi', 'fo', 'fr', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ko', 'lo', 'lt', 'lv', 'ms', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'uk', 'ur', 'sk', 'sv', 'tr', 'th', 'vi', 'zh_CN', 'zh_TW'`.

### Time unix translate

- Arabic number in different unixs *(h/min/s/ms)* -> time in Arabic number as *(h/min/s/ms)*

## Future of this project

For the future of node-shi, go to the [todo-list](https://github.com/RoderickQiu/node-shi/projects/1).

## Packages Using

- js-pinyin, waterchestnet, MIT License.
- timestring, mike182uk, MIT License.
- chinese-numbers-converter, anton-bot, MIT License.
- english2number, TSavo, MIT License.
- HumanizeDuration.js, EvanHahn, Unlicense.
