
// //path module (core module)
// const path = require('path');

// const myPath = 'C:/books/user/Desktop/Node/Modules.js';

// console.log(path.basename(myPath));

//events module which returns a class

// const EventEmitter = require('events');

// const newEvent = new EventEmitter();

//register the event named bellRing not newEvent
// newEvent.on('bellRing',(period)=>{
//     console.log(`The bell rang so the ${period.period} ${period.run}`);
// });

//raise the event
// newEvent.emit('bellRing'); 

//raise the event inside a setTimeout
// setTimeout(()=>{
//     newEvent.emit('bellRing');
// },2000);

// //raise the event inside a setTimeout with a parameter
// setTimeout(()=>{
//     newEvent.emit('bellRing','2nd period has ended');
// },2000);

//raise the event inside a setTimeout with a object parameter
// setTimeout(()=>{
//     newEvent.emit('bellRing',{
//         period: '2nd period',
//         run: '. Let"s" run now'
//     });
// },2000);


//-------------------------------------------------------------------------------------------------

//emit using external module of our own and class

// const School = require('./externalEmit');

// const school = new School();

// //register an event.
// school.on('bellRing',(period)=>{
//         console.log(`The bell rang so the ${period.period} ${period.run}`);
//     });

// school.startPeriod();


//http module

const http = require('http');

const server = http.createServer((req, res)=>{
    res.write('Hello Programmers!');
    res.write('What are you doing?');
    res.end();
});

server.listen(3000);
console.log('listening on port 3000');