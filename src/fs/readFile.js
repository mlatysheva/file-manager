import * as fs from 'fs';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const read = async (filePath, cwd) => {
  const absolutePath = getAbsolutePath(filePath, cwd);
  const doesExistPath = await doesExist(absolutePath);
  if (doesExistPath) {
    try {    
      const readableStream = fs.createReadStream(absolutePath);

      readableStream.on('data', (chunk) => {
          process.stdout.write(chunk);
      })
      commandClosingMsg(cwd);
    } catch (error) {
      console.log(`\r\nOperation failed!\n${error}`);
      commandClosingMsg(cwd);
    }
  } else {
    process.stdout.write(`\r\nSuch file ${filePath} does not exist.\n`);
    commandClosingMsg(cwd);
  }
};
