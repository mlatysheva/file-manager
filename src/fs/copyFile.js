import * as fs from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const copy = async (fileToCopy, newDestination, cwd) => {
  try {
    const absolutePath = getAbsolutePath(fileToCopy, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await fs.copyFile(absolutePath, getAbsolutePath(newDestination, cwd));
      process.stdout.write(`\nFile ${fileToCopy} was successfully copied to ${newDestination}\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`\nNo such file ${fileToCopy} exists!`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed: ${err}`);
  }
};