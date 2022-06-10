// import fs from 'fs';
import * as fs from 'fs/promises';
import path from 'path';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';
import { doesExist } from '../utils/doesExist.js';

export const listDirectory = async (pathToDirectory) => {  
  try {
    const directoryExists = doesExist(pathToDirectory);
    if (directoryExists) {
      await fs.readdir(pathToDirectory, (err, files) => {
        if (err) { 
          console.error(err);
        } 
        files.forEach(async (file, index) => {
          let fileName = path.join(pathToDirectory, file);
    
          await fs.stat(fileName, (err, stats) => {
            if (err) {
              console.log(`FS operation failed!\n${err}`);
              return;
            }
            if (stats.isFile()) {
              const item = {"name": path.basename(file, path.extname(fileName)) + path.extname(fileName), "type": 'file', "size": stats.size};
              console.dir(item);
            } else {
              const item = {"name": file, "type": 'directory', "size": 0};
              console.dir(item);
            }
          });        
        });
      });
    } else {
      console.log(`No such directory ${pathToDirectory} exists.`);
      commandClosingMsg(path.cwd());
    }
  } catch (error) {
    console.log(`FS operation failed!\n${error}`);
  }
};


export const list = async (pathToDirectory) => {
  try {
    const directoryExists = doesExist(pathToDirectory);
    if (directoryExists) {
      // const entries = await fs.readdir(pathToDirectory);
      // console.log(entries);
      let fileArray = [];
      fs.readdir(pathToDirectory)
      .then(files => {
        // for (let filename of filenames) {
        //   console.log(filename);
        // }
        files.forEach(async (file, index) => {
          let fileName = path.join(pathToDirectory, file);
          console.log(file);
          fileArray.push(fileName);
          const stats = await fs.stat(fileName);
          if (stats.isFile()) {
            const item = {"name": path.basename(file, path.extname(fileName)) + path.extname(fileName), "type": 'file', "size": stats.size};
            console.dir(item);
          } else {
            const item = {"name": file, "type": 'directory', "size": 0};
            console.dir(item);
          }
    
          // await fs.stat(fileName, (err, stats) => {
          //   if (err) {
          //     console.log(`FS operation failed!\n${err}`);
          //     return;
          //   }
          //   if (stats.isFile()) {
          //     const item = {"name": path.basename(file, path.extname(fileName)) + path.extname(fileName), "type": 'file', "size": stats.size};
          //     console.dir(item);
          //   } else {
          //     const item = {"name": file, "type": 'directory', "size": 0};
          //     console.dir(item);
          //   }
          // });        
        });
        // commandClosingMsg(pathToDirectory);
      }).then(() => {commandClosingMsg(pathToDirectory)})
      .catch(err => {
        console.log(`\nOperation failed!\n${err}`);
      })
    } else {
      process.stdout.write(`No such directory ${pathToDirectory} exists.\n`);
      commandClosingMsg(path.cwd());
    }
  } catch (error) {
    console.log(`FS operation failed!\n${error}`);
  }
};