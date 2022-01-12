// const EventEmitter = require ('events');//events returns a class, that's y 'E' is capitalized for class declaration convention

// class School extends EventEmitter{
//     startPeriod() {
//         this.emit('bellRing',{//raising the event 
//             period: '2nd period',
//             run: '. Let"s" run now'
//         });
//     }
// }

// module.exports = School;

var a = 10;
console.log('start');

setTimeout(()=>{
    console.log(a);
},3000);
console.log('end');