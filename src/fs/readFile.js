import { readFile } from 'fs/promises';

export const read = async (filePath) => {
  try {    
    await readFile(filePath, 'utf8').then((data) => {
      console.log(data);
    });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};