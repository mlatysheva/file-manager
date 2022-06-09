import * as fs from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const rename = async (fileToRename, newName, cwd) => {
  try {
    const absolutePath = getAbsolutePath(fileToRename, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await fs.rename(absolutePath, getAbsolutePath(newName, cwd));
      process.stdout.write(`\nFile ${fileToRename} was successfully renamed to ${newName}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`\nNo such file ${fileToRename} exists!`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed: ${err}`);
  }
};