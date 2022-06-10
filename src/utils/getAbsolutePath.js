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

export function getAbsolutePath2(userPath, cwd) {
  const resolvedPath = path.resolve(userPath);
  console.log(`resolvedPath: ${resolvedPath}`);
  const isAbsolute = path.isAbsolute(resolvedPath);
  if (isAbsolute) {
    return resolvedPath
  } else {
    return path.join(path.cwd(), userPath);
  }
}
