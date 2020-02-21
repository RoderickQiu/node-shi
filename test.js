var shi = require('./index.js');

// human time -> time in Arabic number
console.log(shi.humanTimeParser("five hundreds and twenty one seconds"));//521
console.log(shi.humanTimeParser("a day and 一 hour, 52 min 16sec"));//93136
console.log(shi.humanTimeParser("三十三分钟"));//1980
console.log(shi.humanTimeParser("50", 'min'))//3000