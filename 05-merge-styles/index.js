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
// console.log(arr);
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
//можно было зелать без создания массива, но это называется ад колбеков
// fs.readdir(path.join(__dirname, 'styles'), 
//   { withFileTypes: true },
//   (err, files) => {
//     if (err)
//       console.log(err);
//     else {
//       files.forEach(file => {
//         if(file.isFile()&&path.extname(file.name)==='.css'){
//           const readableStream = fs.createReadStream(path.join(__dirname,'styles', file.name), {encoding: 'utf-8'});
//           readableStream.on('data', chunk => fs.appendFile(path.join(__dirname,'project-dist','bundle.css'),chunk,(err)=>{
//             if(err)console.log(err);
//           })
            
//           );
//         }
//       });
//     }
//   });

writeFileAsync(path.join(__dirname,'project-dist','bundle.css'),'')
  .then(()=> readdirFiles(path.join(__dirname, 'styles'),'.css'))
  .then(()=> readFilefromArr(arr_css))
  .then(()=>console.log(arr_css))
  .catch(err => console.log(err));
