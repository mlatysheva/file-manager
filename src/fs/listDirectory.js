import fs from 'fs';
import path from 'path';
import { printCurrentDirectory } from '../utils/cwd.js';

export const listDirectory = async (pathToDirectory) => {
  try {
    await fs.readdir(pathToDirectory, (err, files) => {

      if (err) { 
        console.error(err);
      } else {  
          files.forEach(async (file, index) => {
          let fileName = path.join(pathToDirectory, file);
    
          fs.stat(fileName, (err, stats) => {
            if (err) {
              console.error(err)
              return;
            }
            if (stats.isFile()) {
              const item = {"name": path.basename(file, path.extname(fileName)), "type": 'file', "size": stats.size};
              console.dir(item);

            } else {
              const item = {"name": file, "type": 'directory', "size": 0};
              console.dir(item);
            }
          });        
        });
        // printCurrentDirectory(pathToDirectory);
        // console.log('Enter your command:');
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    // printCurrentDirectory(pathToDirectory);
    // console.log('Enter your command:');
  }  
};