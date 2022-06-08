export const isDirectory = (path) => {
  return fs.stat(path).isDirectory();
}