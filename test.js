var shi = require('./index.js');

// human time -> time in Arabic number
console.log(shi.humanTimeParser("five hundreds and twenty one seconds"));
console.log(shi.humanTimeParser("1 day 52 min 16sec"));
console.log(shi.humanTimeParser("三十三分钟"));
console.log(shi.humanTimeParser("50", 'min'))