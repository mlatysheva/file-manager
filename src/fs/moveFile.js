import * as fs from 'fs/promises';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const move = async (fileToMove, newDestination, cwd) => {
  try {
    const absolutePath = getAbsolutePath(fileToMove, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await fs.copyFile(absolutePath, getAbsolutePath(newDestination, cwd));
      await fs.rm(absolutePath);
      process.stdout.write(`\nFile ${fileToMove} was successfully moved to ${newDestination}\n`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`\nNo such file ${fileToMove} exists!`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`FS operation failed! Make sure to include the name of the file in the destination path!\n${err}`);
  }
};