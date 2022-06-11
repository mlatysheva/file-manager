import { EOL } from 'os';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const compress = async (path_to_file, path_to_destination, cwd) => {
  try {
    const absolutePath = getAbsolutePath(path_to_file, cwd);
    const filename = path_to_file.replace(/^.*[\\\/]/, '');
    let newAbsolutePath = getAbsolutePath(path_to_destination, cwd);
    const doesAbsolutePathExist = await doesExist(absolutePath);
    let doesNewAbsolutePathExist = true;
    if (!newAbsolutePath.includes('.')) {
      doesNewAbsolutePathExist = await doesExist(newAbsolutePath);
      newAbsolutePath += `/${filename}.br`;      
    } else {
      const newAbsolutePathDirname = path.dirname(newAbsolutePath);
      doesNewAbsolutePathExist = await doesExist(newAbsolutePathDirname);
    }
    if (doesAbsolutePathExist && doesNewAbsolutePathExist) {   
      const fileToCompress = createReadStream(absolutePath);
      const writableStream = createWriteStream(newAbsolutePath);
      const brotli = zlib.createBrotliCompress();

      fileToCompress.pipe(brotli).pipe(writableStream);

      process.stdout.write(`${EOL}File ${path_to_file} was successfully compressed to ${newAbsolutePath}.${EOL}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`${EOL}Specify valid paths for ${path_to_file} and ${path_to_destination}.${EOL}`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.log(`Operation failed! ${err}`);
  }
};
