const { spawn } = require('child_process');

const child = spawn('ls',['-lh']);

child.stdout.on('data',(data)=>{
    console.log(`stdout: ${data}`);
});
console.log('--------------------------------------------------');
child.stderr.on('data',(data)=>{
    console.log(`stderr: ${data}`);
});
child.on('error',(error)=>{
    console.log(`error: ${error}`);
});
console.log('-----------------------------------------------');
// console.log(child);
child.on('exit',(code,signal)=>{
    console.log(`done`);
});