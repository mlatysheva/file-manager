import { createReadStream } from 'fs';
import { EOL } from 'os';
import { createHash } from 'crypto';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const calculateHash = async (filePath, cwd) => {
  try {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      const stream = createReadStream(filePath);
      let hash = '';
      stream.on('data', (data) => {
        hash = createHash('sha256').update(data).digest('hex');        
      });
      stream.on('end', () => {
        process.stdout.write(`${EOL}Hash for the file: ${filePath} is: ${hash}${EOL}`);
        commandClosingMsg(cwd);
        return hash;
      });
    } else {
      process.stdout.write(`${EOL}No such file ${filePath} exists.${EOL}`);
      commandClosingMsg(cwd);
    }
  } catch (error) {
    console.log(`${EOL}Operation failed!${EOL}${error}`);
    commandClosingMsg(cwd);
  }
};
