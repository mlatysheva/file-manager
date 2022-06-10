import { rm, createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const move = async (fileToMove, newDestination, cwd) => {
  try {
    const filename = fileToMove.replace(/^.*[\\\/]/, '');
    const absolutePath = getAbsolutePath(fileToMove, cwd);
    let newAbsolutePath = getAbsolutePath(newDestination, cwd);
    const doesNewAbsolutePathExist = await doesExist(newAbsolutePath);
    if (!newAbsolutePath.includes('.')) {
      newAbsolutePath += `/${filename}`;
    }
    const doesAbsolutePathExist = await doesExist(absolutePath);
    if (doesAbsolutePathExist && doesNewAbsolutePathExist) {
      const readable = createReadStream(absolutePath);
      const writable = createWriteStream(newAbsolutePath);
      readable.pipe(writable);
      rm(absolutePath, (error) => {
        if (error) {
          console.error(`${EOL}Operation failed!\n${error}${EOL}`);
        }
      });
      process.stdout.write(`${EOL}File ${fileToMove} was successfully moved to ${newDestination}${EOL}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`${EOL}Enter valid paths for ${fileToMove} and ${newDestination}!${EOL}`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed! ${err}`);
    commandClosingMsg(cwd);
  }
};

// { encoding: 'utf8', highWaterMark: 16 * 1024 }