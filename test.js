var shi = require('./index.js');

// human time -> time in Arabic number as seconds
console.log(shi.humanTimeParser("five hundreds and twenty one seconds"));//521
console.log(shi.humanTimeParser("a day and 一 hour, 52 min 16sec"));//93136
console.log(shi.humanTimeParser("三十三分钟", { to: "m" }));//33
shi.setDefault({ as: 'm' });//set default
console.log(shi.humanTimeParser("50", { to: 'h' }))//0.8333333333333334
console.log(shi.humanTimeParser("50", { as: 'h', to: 'm' }))//3000
shi.clearDefault();//clear defaults
console.log(shi.humanTimeParser("badstring", { ignoreError: true }))//badstring (because errors ignored)

// unit convert
console.log(shi.unitConverter(60, 'm', 'h'));//1
console.log(shi.unitConverter(1, "d", "ms"));//86400000

// time in Arabic number -> human time
console.log(shi.ArabicNumberTimeParser(1500));//25 minutes
console.log(shi.ArabicNumberTimeParser(36, { lang: 'fr', to: 'h' }));//0,01 heure
console.log(shi.ArabicNumberTimeParser(1, { lang: 'zh_CN', as: 'ms', to: 's', round: true }));//0 秒
console.log(shi.ArabicNumberTimeParser(NaN, { ignoreError: true }))//0 seconds (because errors ignored)

// output the version
console.log(shi.version());//0.4.1