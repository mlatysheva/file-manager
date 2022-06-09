import * as fs from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const remove = async (fileToDelete, cwd) => {
  try {
    const absolutePath = getAbsolutePath(fileToDelete, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await fs.rm(absolutePath);
      process.stdout.write(`\nFile ${fileToDelete} was successfully deleted.\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`\nNo such file ${fileToDelete} exists!`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed!\n${err}`);
  }
};