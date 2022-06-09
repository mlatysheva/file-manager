import fs from 'fs';
import { createGzip } from 'zlib';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

// implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API

export const compress = async (path_to_file, path_to_destination, cwd) => {
  try {
    const absolutePath = getAbsolutePath(path_to_file, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {   
      const fileToCompress = fs.createReadStream(absolutePath);
      const archive = createGzip();
      const writableStream = fs.createWriteStream(getAbsolutePath(path_to_destination, cwd));
      fileToCompress.pipe(archive).pipe(writableStream);
      process.stdout.write(`\nFile ${path_to_file} was successfully compressed.\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`No such file or directory ${path_to_file} exists.\n`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.log(`FS operation failed.\n${err}`);
  }
};
