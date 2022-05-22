/* eslint-disable indent */
// const fs = require('fs');
// const path = require('path');
// fs.writeFile(path.join(__dirname, 'text.txt'),'',(err) => {
//   if (err) throw err;
// });
// function writeText(text){
//     fs.appendFile(
//         path.join(__dirname, 'text.txt'),
//         text,
//         err => {
//             if (err) throw err; 
//         }
//     );
// }
// function close(){
//     const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});
//     readableStream.on('data', chunk => console.log('your enter text: ',chunk, ' Goodbye...'));
// }
// let readline = require('readline');

// let rl = readline.createInterface(process.stdin, process.stdout);

// rl.question('Hello, can you write something?\n', function(answer){
//     writeText(answer);
//     if (answer ==='exit'){
//         rl.close();
//     }
//     rl.on('line', (input) => {
//         writeText(input);
//         if (input ==='exit'){
//             rl.close();
//         }
//       });
// });
// rl.on('close',function(){
//     close();
// });
// process.on('exit',()=>{
//     console.log('you have not entered a single word');
// });
// process.on('beforeExit', () => {
//    close();
//     process.exit();
//   });

const fs = require('fs');
const path = require('path');

function writeText(text){
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        text,
        err => {
            if (err) throw err; 
        }
    );
}
function close(){
    const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});
    readableStream.on('data', chunk => console.log('your enter text: ',chunk, ' Goodbye...'));
}
fs.writeFile(path.join(__dirname, 'text.txt'),'',(err) => {
  if (err) {throw err;}
  else{
    let readline = require('readline');

    let rl = readline.createInterface(process.stdin, process.stdout);
    
    rl.question('Hello, can you write something?\n', function(answer){
        writeText(answer);
        if (answer ==='exit'){
            rl.close();
        }
        rl.on('line', (input) => {
            writeText(input);
            if (input ==='exit'){
                rl.close();
            }
          });
    });
    rl.on('close',function(){
        close();
    });
    // process.on('exit',()=>{
    //     console.log('you have not entered a single word');
    // });
    process.on('beforeExit', () => {
       close();
        process.exit();
      });
  }
});
//как вывести ответ, когда пользаватель не написал и вышел? если знаете напишите.
