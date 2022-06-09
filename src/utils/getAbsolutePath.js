import path from 'path';
import { getHomedir } from './getHomedir.js';

export function getAbsolutePath(userPath, cwd) {
  let absolutePath = '';
    if (userPath.startsWith(getHomedir())) {
      absolutePath = userPath;
    } else {
      absolutePath = path.join(cwd, userPath);
    };
  return absolutePath;
}