const fs = require('fs');


const path = require('path');

let arr_css=[];
const writeFileAsync = async (path, data) => {
  return new Promise ((resolve,reject)=>fs.writeFile(path,data,(err)=>{
    if(err){
      return reject(err.massage);
    }  
    resolve(); 
  }));
};

const readdirFiles = async (_path, extension) => {  
  await  new Promise((resolve,reject)=> {
    fs.readdir((_path), 
      { withFileTypes: true },
      (err, files)=>{
        if (err){
          return reject(err.massage);
        } 
        resolve(
          files.forEach(file => {
            if(file.isFile()&&path.extname(file.name)===extension){
              arr_css.push(file.name);
            }
          }
          ) );
      } 
    );
  }
  );
};

const readFilefromArr = async (arr) => {

  return  new Promise ((resolve,reject) => arr.forEach(file=>{ 
  
    const readableStream = fs.createReadStream(path.join(__dirname,'styles', file),{encoding: 'utf-8'},(err)=>{
      if(err){
        return reject(err.massage);
      }  
    });
    resolve(readableStream.on('data', chunk =>{fs.appendFile(path.join(__dirname,'project-dist','bundle.css'),chunk,(err)=>{
      if(err)console.log(err);});
    }),
   
    );
  })
  );
};


writeFileAsync(path.join(__dirname,'project-dist','bundle.css'),'')
  .then(()=> readdirFiles(path.join(__dirname, 'styles'),'.css'))
  .then(()=> readFilefromArr(arr_css))
  .catch(err => console.log(err));
