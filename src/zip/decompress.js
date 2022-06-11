import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';
import path  from 'path';
import zlib from 'zlib';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';

export const decompress = async (path_to_file, path_to_destination, cwd) => {
  try {
    if (path_to_file.slice(-3) !== '.br') {
      console.log(`${path_to_file} is not a valid compressed file. Specify a file with a valid extention ".br"`);
      commandClosingMsg(cwd);
    } else {
      const absolutePath = getAbsolutePath(path_to_file, cwd);
      const doesAbsolutePathExist = await doesExist(absolutePath);
      const filename = path_to_file.slice(0, -3).replace(/^.*[\\\/]/, '');
      let newAbsolutePath = getAbsolutePath(path_to_destination, cwd);
      let doesNewAbsolutePathExist = true;
      if (!newAbsolutePath.includes('.')) {
        doesNewAbsolutePathExist = await doesExist(newAbsolutePath);
        newAbsolutePath += `/${filename}`;
      } else {
        const newAbsolutePathDirname = path.dirname(newAbsolutePath);
        doesNewAbsolutePathExist = await doesExist(newAbsolutePathDirname);
      }
      if (doesAbsolutePathExist && doesNewAbsolutePathExist) {
        const fileToDecompress = createReadStream(absolutePath);
        const writableStream = createWriteStream(newAbsolutePath);
        const brotli = zlib.createBrotliDecompress();

        fileToDecompress.pipe(brotli).pipe(writableStream);

        process.stdout.write(`${EOL}File ${path_to_file} was successfully decompressed to ${newAbsolutePath}.${EOL}`);
        commandClosingMsg(cwd);
      } else {
        process.stdout.write(`${EOL}Specify valid paths for ${path_to_file} or ${path_to_destination}.${EOL}`);
        commandClosingMsg(cwd);
      }
    }
  } catch (err) {
    console.log(`Operation failed. ${err}`);
  }
};
