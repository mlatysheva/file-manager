import fs from 'fs';
import path from 'path';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';

// implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API

export const compress = async (path_to_file, path_to_destination) => {
  try {
    const fileToCompress = fs.createReadStream(path_to_file);
    const archive = createGzip();
    const writableStream = fs.createWriteStream(path_to_destination);
    fileToCompress.pipe(archive).pipe(writableStream);
    process.stdout.write(`\nFile ${path_to_file} was successfully compressed.\n`);
  } catch (err) {
    console.log(err);
  }
};
