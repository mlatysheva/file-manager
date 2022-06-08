import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

export const read = async () => {
  try {
    const ____dirname = path.dirname(fileURLToPath(import.meta.url));
    const pathFile = path.join(____dirname, '/files/fileToRead.txt');
    
    await readFile(pathFile, 'utf8').then((data) => {
      console.log(data);
    });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};