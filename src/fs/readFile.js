import { createReadStream } from 'fs';
import { EOL } from 'os';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const read = async (filePath, cwd) => {
  const absolutePath = getAbsolutePath(filePath, cwd);
  const doesExistPath = await doesExist(absolutePath);
  if (doesExistPath) {
    try {    
      const readableStream = createReadStream(absolutePath, 'utf8');

      readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
      })
      readableStream.on('end', () => {
        commandClosingMsg(cwd);
      });
    } catch (error) {
      console.log(`${EOL}Operation failed!${EOL}${error}`);
      commandClosingMsg(cwd);
    }
  } else {
    process.stdout.write(`${EOL}No such file ${filePath} exists.${EOL}`);
    commandClosingMsg(cwd);
  }
};
