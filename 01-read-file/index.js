const fs = require('fs');
const path = require('path');

const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});
stream.on('readable', function(){
  let data = stream.read();
  if(data === null){stream.close();
  } else {
    console.log(data);
  }
});


// const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});
// readableStream.on('data', chunk => console.log(chunk));






