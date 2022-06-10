import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const copy = async (fileToCopy, newDestination, cwd) => {
  try {
    const filename = fileToCopy.replace(/^.*[\\\/]/, '');
    const absolutePath = getAbsolutePath(fileToCopy, cwd);
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
      process.stdout.write(`${EOL}File ${fileToCopy} was successfully copied to ${newDestination}${EOL}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`${EOL}Specify valid paths for the file to copy and new destination!${EOL}`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed! ${err}`);
    commandClosingMsg(cwd);
  }
};
