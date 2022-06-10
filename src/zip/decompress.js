import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';

export const decompress = async (path_to_file, path_to_destination, cwd) => {
  try {
    if (path_to_file.slice(-3) !== '.br') {
      console.log(`\n${path_to_file} is not a valid compressed file. Specify a file with a valid extention ".br"`);
      commandClosingMsg(cwd);
    } else {
      const absolutePath = getAbsolutePath(path_to_file, cwd);
      const doesExistPath = await doesExist(absolutePath);
      if (doesExistPath) {
        const fileToDecompress = createReadStream(absolutePath);
        const writableStream = createWriteStream(getAbsolutePath(path_to_destination, cwd));
        const brotli = zlib.createBrotliDecompress();

        fileToDecompress.pipe(brotli).pipe(writableStream);

        process.stdout.write(`\nFile ${path_to_file} was successfully decompressed.`);
        commandClosingMsg(cwd);
      } else {
        process.stdout.write(`\nNo such file or directory ${path_to_file} exists.`);
        commandClosingMsg(cwd);
      }
    }
  } catch (err) {
    console.log(`\nOperation failed.\r\n${err}`);
  }
};
