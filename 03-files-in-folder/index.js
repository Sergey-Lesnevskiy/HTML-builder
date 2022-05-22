const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'secret-folder'), 
  { withFileTypes: true },
  (err, files) => {
    console.log('\nCurrent directory files:');
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()){
          fs.stat(path.join(__dirname, 'secret-folder',file.name), (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }else{
              console.log('name: '+file.name.split('.')[0],'; file extension: '+path.extname(file.name).split('.')[1],'; size: ' + stats.size);
            }
          });
        }
      });
    }
  });
