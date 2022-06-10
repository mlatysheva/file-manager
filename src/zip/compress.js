import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const compress = async (path_to_file, path_to_destination, cwd) => {
  try {
    const absolutePath = getAbsolutePath(path_to_file, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (path_to_destination.slice(-3) !== '.br') {
      path_to_destination += '.br';
    }
    if (doesExistPath) {   
      const fileToCompress = createReadStream(absolutePath);
      const writableStream = createWriteStream(getAbsolutePath(path_to_destination, cwd));
      const brotli = zlib.createBrotliCompress();

      fileToCompress.pipe(brotli).pipe(writableStream);

      process.stdout.write(`\nFile ${path_to_file} was successfully compressed.\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`No such file or directory ${path_to_file} exists.\n`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.log(`FS operation failed!\n${err}`);
  }
};
