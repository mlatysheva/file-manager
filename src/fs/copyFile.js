import { createReadStream, createWriteStream } from 'fs';
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
      process.stdout.write(`\r\nFile ${fileToCopy} was successfully copied to ${newDestination}\r\n`);
      commandClosingMsg(path.cwd());
    } else {
      process.stdout.write(`\r\nSpecify valid paths for the file to copy and new destination!\r\n`);
      commandClosingMsg(path.cwd());
    }
  } catch (err) {
    console.error(`FS operation failed! ${err}`);
  }
};
