import * as fs from 'fs/promises';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { commandClosingMsg } from '../utils/commandClosingMsg.js';

export const create = async (userPath, cwd) => {
  const absolutePath = getAbsolutePath(userPath, cwd);
  try {
    await fs.writeFile(absolutePath, '');
    console.log(`\nFile ${userPath} was successfully created.`);
  } catch (err) {
    console.log(`FS operation failed!\n${err}`);
  }
  commandClosingMsg(cwd);
}
