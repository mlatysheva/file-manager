import * as fs from 'fs/promises';
import { EOL } from 'os';
import { doesExist } from '../utils/doesExist.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const rename = async (fileToRename, newName, cwd) => {
  try {
    const absolutePath = getAbsolutePath(fileToRename, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
      await fs.rename(absolutePath, getAbsolutePath(newName, cwd));
      process.stdout.write(`${EOL}File ${fileToRename} was successfully renamed to ${newName}${EOL}`);
      commandClosingMsg(cwd);
    } else {
      process.stdout.write(`${EOL}No such file ${fileToRename} exists!${EOL}`);
      commandClosingMsg(cwd);
    }
  } catch (err) {
    console.error(`${EOL}Operation failed!${EOL}${err}`);
  }
};
