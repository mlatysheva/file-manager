import { createGunzip } from 'zlib';
import * as fs from 'fs';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';

export const decompress = async (path_to_file, path_to_destination, cwd) => {
  try {
    const absolutePath = getAbsolutePath(path_to_file, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      const fileToDecompress = fs.createReadStream(absolutePath);
      const archive = createGunzip();
      const writableStream = fs.createWriteStream(getAbsolutePath(path_to_destination, cwd));
      fileToDecompress.pipe(archive).pipe(writableStream);
      process.stdout.write(`\nFile ${path_to_file} was successfully decompressed.\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`No such file or directory ${path_to_file} exists.\n`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.log(`FS operation failed.\r\n${err}`);
  }
};
