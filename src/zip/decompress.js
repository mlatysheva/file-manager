import { createGunzip } from 'zlib';
import * as fs from 'fs';

export const decompress = async (path_to_file, path_to_destination) => {
  try {
    const fileToDecompress = fs.createReadStream(path_to_file);
    const archive = createGunzip();
    const writableStream = fs.createWriteStream(path_to_destination);
    fileToDecompress.pipe(archive).pipe(writableStream);
    process.stdout.write(`File ${path_to_file} was successfully decompressed.\n`);
  } catch (err) {
    console.log(err);
  }
};
