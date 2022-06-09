import fs from 'fs';

export const doesExist = async (path) => {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    console.error(error);
    return false;    
  }
}
