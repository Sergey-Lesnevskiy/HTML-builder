const path = require('path');
const fs  = require('fs');
const fsPromise = require('fs/promises');



const addMKDIRFileAsync = async (path1) => {
 
  fsPromise.mkdir((path1),{ recursive: true });
};

const createHtml = async function () {

  let template = await fsPromise.readFile(path.resolve(__dirname,'template.html'),'utf-8');
  const components = await fsPromise.readdir(path.resolve(__dirname,'components'),{withFileTypes: true});

  for await(let item of components) {
    let fileName = item.name.split('.')[0];
    let filePath = path.join(path.resolve(__dirname,'components'),item.name);
    let fileChange = await fsPromise.readFile(filePath,'utf-8');
    
    if(template.includes( `{{${fileName}}}`)) {
      template = template.replace(`{{${fileName}}}`,`${fileChange}`) ;
    }
  }
  await fsPromise.writeFile(path.join(path.resolve(__dirname,'project-dist'),'index.html'),template);
};

const copyFolder = async function () {
 
  const assetsFolders =  await fsPromise.readdir(path.resolve(__dirname,'assets'),{withFileTypes: true});
 
  assetsFolders.forEach( async (item) => {
  
    const itemFolder = path.join(path.resolve(__dirname,'assets'),item.name);
    const itemFolderNew = path.join(path.resolve(__dirname,'project-dist','assets'),item.name);
    if(item.isDirectory()) {
      const innerAssetsFolders = await fsPromise.mkdir(itemFolderNew,{recursive: true});
      if(!innerAssetsFolders) {
        await fsPromise.rm(itemFolderNew,{recursive: true});
        await fsPromise.mkdir(itemFolderNew);
      }
      const files =  await fsPromise.readdir(itemFolder,{withFileTypes: true});
      files.forEach(async (file) => {
        let currentPathFile = path.join(itemFolder,file.name);
        let currentPathNewFile = path.join(itemFolderNew,file.name);
        await fsPromise.copyFile(currentPathFile,currentPathNewFile);
      });
    }
  
  });

};

async function creatHTMLBUILDER(){
  await addMKDIRFileAsync(path.join(__dirname,'project-dist'));
  await addMKDIRFileAsync(path.join(__dirname,'project-dist','assets'));
  await createHtml();
  await copyFolder();
}
creatHTMLBUILDER();

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

// fs.readdir(path.join(__dirname, 'assets','fonts'), 
//   { withFileTypes: true },
//   (err, files) => {
//     if (err)
//       console.log(err);
//     else {
//       files.forEach(file => {
//         if(file.isFile()){
//           fs.copyFile( path.join(__dirname, 'assets','fonts',file.name), path.join(__dirname,'project-dist','assets','fonts',file.name), (err) => {
//             if (err) throw err;
//           });
//         }
//       });
//     }
//   });
// fs.readdir(path.join(__dirname, 'assets','img'), 
//   { withFileTypes: true },
//   (err, files) => {
//     if (err)
//       console.log(err);
//     else {
//       files.forEach(file => {
//         if(file.isFile()){
//           fs.copyFile( path.join(__dirname, 'assets','img',file.name), path.join(__dirname,'project-dist','assets','img',file.name), (err) => {
//             if (err) throw err;
//           });
//         }
//       });
//     }
//   });
// fs.readdir(path.join(__dirname, 'assets','svg'), 
//   { withFileTypes: true },
//   (err, files) => {
//     if (err)
//       console.log(err);
//     else {
//       files.forEach(file => {
//         if(file.isFile()){
//           fs.copyFile( path.join(__dirname, 'assets','svg',file.name), path.join(__dirname,'project-dist','assets','svg',file.name), (err) => {
//             if (err) throw err;
//           });
//         }
//       });
//     }
//   });