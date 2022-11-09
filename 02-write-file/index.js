

const fs = require('fs');
const path = require('path');

function writeText(text) {
  fs.appendFile(path.join(__dirname, 'text.txt'), text, (err) => {
    if (err) throw err;
  });
}
// function test(chunk){
//   console.log(chunk);
//  if(chunk===''){
//   console.log(' Goodbye...');
//  }else{
//   console.log('your enter text: ', chunk, ' Goodbye...');
//  }
// }
function close() {
  // const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  //   encoding: 'utf-8',
  // });
 
  // readableStream.on('data', (chunk) =>test(chunk)
 
  //  );
  // console.log('\n');
  console.log(' Goodbye...');

}
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) {
    throw err;
  } else {
    let readline = require('readline');
    let rl = readline.createInterface(process.stdin, process.stdout);
    rl.question('Hello, can you write something?\n', function (answer) {
      writeText(answer);
      if (answer === 'exit') {
        rl.close();
      }
      rl.on('line', (input) => {
        writeText(input);
        if (input === 'exit') {
          rl.close();
        }
      });
    });
    rl.on('close', function () {
      close();
      process.exit();
    });
    // process.on('beforeExit', () => {
    //   close();
    //   process.exit();
    // });
  }
});

