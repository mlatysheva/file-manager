import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { doesExist } from '../utils/doesExist.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';
// implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and return it as hex

export const calculateHash = async (filePath, cwd) => {
  try {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      const data = await readFile(absolutePath);
      const hash = createHash('sha256').update(data).digest('hex');
      process.stdout.write(`Hash for the file: ${filePath} is: ${hash}\n`);
      commandClosingMsg(cwd);
      return hash;
    } else {
      process.stdout.write(`No such file ${filePath} exists.\n`);
      commandClosingMsg(cwd);
    }
  } catch (error) {
    console.log(`FS operation failed!\n${error}`);
    commandClosingMsg(cwd);
  }
};

// const absolutePath = getAbsolutePath(filePath, cwd);
//           const doesExistPath = await doesExist(absolutePath);
//           if (doesExistPath) {
//             const hash = await calculateHash(absolutePath);
//             process.stdout.write(`Hash for the file: ${filePath} is: ${hash}\n`);
//             commandClosingMsg(cwd);
//           } else {
//             process.stdout.write(`No such file or directory ${filePath} exists.\n`);
//             commandClosingMsg(cwd);
//           }