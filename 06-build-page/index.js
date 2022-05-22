

const fs = require('fs');



const path = require('path');

fs.mkdir(path.join(__dirname,'project-dist'),{ recursive: true }, err => {
  if(err) throw err; 
  
});

const promise= new Promise((resolve,reject)=>{
  fs.readFile(path.join(__dirname,'components','header.html'),{encoding: 'utf-8'},(err,data)=>{
    if (err) reject(err) ;
    resolve(data);
  }  
  );
});
promise.then(data1=>{
  const promise2 = new Promise((resolve,reject)=>{
    fs.readFile(path.join(__dirname,'template.html'),{encoding: 'utf-8'},(err,data)=>{
      if (err) reject(err) ;
      if(data.includes('{{header}}')){
        resolve(data.split('{{header}}').join(data1));
      }
    });
  });
  promise2.then(data2 =>{
    const promise3 = new Promise((resolve,reject)=>{
      fs.writeFile(path.join(__dirname,'project-dist','index.html'),data2,(err)=>{
        if (err) reject(err) ;
        
        resolve();
      });
    });
    promise3.then(()=>{
      const promise4= new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'components','footer.html'),{encoding: 'utf-8'},(err,datafooter)=>{
          if (err) reject(err) ;
          resolve(datafooter);
        }  
        );
      });
      promise4.then(dataFoot=>{
        const promise5 = new Promise((resolve,reject)=>{
          fs.readFile(path.join(__dirname,'project-dist','index.html'),{encoding: 'utf-8'},(err,data)=>{
            if (err) reject(err) ;
            if(data.includes('{{footer}}')){
              resolve(data.split('{{footer}}').join(dataFoot));
            }
          });
        });
        promise5.then(datafooter2=>{
          const promise6 = new Promise((resolve,reject)=>{
            fs.writeFile(path.join(__dirname,'project-dist','index.html'),datafooter2,(err)=>{
              if (err) reject(err) ;
              
              resolve();
            });
          });
          promise6.then(()=>{
            const promise7= new Promise((resolve,reject)=>{
              fs.readFile(path.join(__dirname,'components','articles.html'),{encoding: 'utf-8'},(err,dataarticles)=>{
                if (err) reject(err) ;
                resolve(dataarticles);
              }  
              );
            });
            promise7.then(dataarticles=>{
              const promise8 = new Promise((resolve,reject)=>{
                fs.readFile(path.join(__dirname,'project-dist','index.html'),{encoding: 'utf-8'},(err,data)=>{
                  if (err) reject(err) ;
                  if(data.includes('{{articles}}')){
                    resolve(data.split('{{articles}}').join(dataarticles));
                  }
                });
              });
              promise8.then(dataarticles2=>{
                const promise9 = new Promise((resolve,reject)=>{
                  fs.writeFile(path.join(__dirname,'project-dist','index.html'),dataarticles2,(err)=>{
                    if (err) reject(err) ;
                    resolve();
                  });
                });
                promise9.then(()=>{
                  console.log('html create');
                });
              });
            });
          });
        });
      });
    });
  });
});

fs.writeFile(path.join(__dirname,'project-dist','style.css'),'',(err)=>{
  if (err){ throw(err) ;}
  console.log('file css create');
});

fs.readdir(path.join(__dirname, 'styles'), 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()&&path.extname(file.name)==='.css'){
          const readableStream = fs.createReadStream(path.join(__dirname,'styles', file.name), {encoding: 'utf-8'});
          readableStream.on('data', chunk => fs.appendFile(path.join(__dirname,'project-dist','style.css'),chunk,(err)=>{
            if(err)console.log(err);
          })
            
          );
        }
      });
    }
  });

const promise10 = new Promise((resolve,reject)=>{
  fs.mkdir(path.join(__dirname,'project-dist','assets'), { recursive: true }, err => {
    if(err) reject(err);
    resolve();
  });
});
promise10.then(()=>{
  const promise11 = new Promise((resolve,reject)=>{
    fs.mkdir(path.join(__dirname,'project-dist','assets','fonts'), { recursive: true }, err => {
      if(err) reject(err);
      resolve();
    });
  });
  promise11.then(()=>{
    const promise12 = new Promise((resolve,reject)=>{
      fs.mkdir(path.join(__dirname,'project-dist','assets','img'), { recursive: true }, err => {
        if(err) reject(err);
        resolve();
      });
    });
    promise12.then(()=>{
      const promise13 = new Promise((resolve,reject)=>{
        fs.mkdir(path.join(__dirname,'project-dist','assets','svg'), { recursive: true }, err => {
          if(err) reject(err);
          resolve();
        });
      });   
      promise13.then(()=>{
        console.log('folers created');
      });
    });
  });
});


fs.readdir(path.join(__dirname, 'assets','fonts'), 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()){
          fs.copyFile( path.join(__dirname, 'assets','fonts',file.name), path.join(__dirname,'project-dist','assets','fonts',file.name), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
fs.readdir(path.join(__dirname, 'assets','img'), 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()){
          fs.copyFile( path.join(__dirname, 'assets','img',file.name), path.join(__dirname,'project-dist','assets','img',file.name), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
fs.readdir(path.join(__dirname, 'assets','svg'), 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isFile()){
          fs.copyFile( path.join(__dirname, 'assets','svg',file.name), path.join(__dirname,'project-dist','assets','svg',file.name), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
  