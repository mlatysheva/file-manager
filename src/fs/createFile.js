import * as fs from 'fs';

export function create(filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
        console.log(`\nFile ${filePath} was successfully created.`);
      }
    });
  });
}
