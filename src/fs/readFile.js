import { readFile } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const read = async (filePath, cwd) => {
  const absolutePath = getAbsolutePath(filePath, cwd);
  const doesExistPath = await doesExist(absolutePath);
  if (doesExistPath) {
    try {    
      await readFile(absolutePath, 'utf8').then((data) => {
      console.log(data);
      });
      commandClosingMsg(cwd);
    } catch (error) {
      console.log(`FS operation failed\n${error}`);
      commandClosingMsg(cwd);
    }
  } else {
    process.stdout.write(`No such file or directory ${filePath}\n`);
    commandClosingMsg(cwd);
  }
};