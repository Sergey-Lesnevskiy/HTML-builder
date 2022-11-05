const fs = require('fs');
const path = require('path');

fs.promises.mkdir(path.join(__dirname,'file-copy'), { recursive: true }, err => {
  if(err) throw err; });

fs.readdir(path.join(__dirname, 'file-copy'), (err, files) => {
  if (err) throw err;
  if(files){
    for (const file of files) {
      fs.unlink(path.join(__dirname, 'file-copy', file), (err) => {
        if (err) throw err;
      });
    }
  }
});
  
fs.readdir(path.join(__dirname, 'files'), 

  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()){
          fs.copyFile( path.join(__dirname,'files',file.name), path.join(__dirname,'file-copy',file.name), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });


