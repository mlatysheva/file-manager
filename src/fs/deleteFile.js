import * as fs from 'fs/promises';
import { EOL } from 'os';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const remove = async (fileToDelete, cwd) => {
  try {
    const absolutePath = getAbsolutePath(fileToDelete, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await fs.rm(absolutePath);
      process.stdout.write(`${EOL}File ${fileToDelete} was successfully deleted.${EOL}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`${EOL}No such file ${fileToDelete} exists!${EOL}`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`${EOL}Operation failed!${EOL}${err}`);
  }
};