export function extractPaths(pathString, category='') {
  const extractedPaths = [];
  let helpArray = pathString.split('.');
  let sections = helpArray.length;
  if (sections < 2) {
    console.log('Specify valid paths!');
    return;
  }
  let firstPath = '';
  let secondPath = '';
  if (category === 'decompress') {
    firstPath = helpArray[0] + '.' + helpArray[1];
    secondPath = pathString.substring(firstPath.length + 1);
  } else {
    firstPath = helpArray[0];
    secondPath = pathString.substring(firstPath.length + 1);
  }  
  let extension = secondPath.split(' ')[0];
  firstPath = `${firstPath}.${extension}`;
  secondPath = pathString.substring(firstPath.length + 1);
  extractedPaths.push(firstPath, secondPath);
  return extractedPaths;
}
