import { EOL } from 'os';
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
    const doesNewAbsolutePathExist = await doesExist(newAbsolutePath);
    if (!newAbsolutePath.includes('.')) {
      newAbsolutePath += `/${filename}.br`;
    }
    if (doesAbsolutePathExist && doesNewAbsolutePathExist) {   
      const fileToCompress = createReadStream(absolutePath);
      const writableStream = createWriteStream(newAbsolutePath);
      const brotli = zlib.createBrotliCompress();

      fileToCompress.pipe(brotli).pipe(writableStream);

      process.stdout.write(`${EOL}File ${path_to_file} was successfully compressed to ${newAbsolutePath}.${EOL}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`No such file or directory ${path_to_file} exists.\n`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.log(`${EOL}FS operation failed!${EOL}${err}`);
  }
};
