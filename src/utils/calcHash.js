import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
// implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and return it as hex

export const calculateHash = async (filePath) => {
  const data = await readFile(filePath);
  const hash = createHash('sha256').update(data).digest('hex');
  return hash;
};