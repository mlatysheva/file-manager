import * as fs from 'fs';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const copy = async (fileToCopy, newDestination, cwd) => {
  try {
    const filename = fileToCopy.replace(/^.*[\\\/]/, '');
    const absolutePath = getAbsolutePath(fileToCopy, cwd);
    let newAbsolutePath = getAbsolutePath(newDestination, cwd);
    if (!newAbsolutePath.includes('.')) {
      newAbsolutePath += `/${filename}`;
    }
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      const readable = fs.createReadStream(absolutePath, { encoding: 'utf8', highWaterMark: 16 * 1024 });
      const writable = fs.createWriteStream(newAbsolutePath);
      readable.pipe(writable);
      process.stdout.write(`\nFile ${fileToCopy} was successfully copied to ${newDestination}\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`\nNo such file ${fileToCopy} exists!`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed! ${err}`);
  }
};
