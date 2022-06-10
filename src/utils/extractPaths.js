export function extractPaths(pathString) {
  const extractedPaths = [];
  let helpArray = pathString.split('.');
  let sections = helpArray.length;
  if (sections < 2) {
    console.log('\nSpecify valid paths!');
    return;
  }
  let firstPath = helpArray[0];
  let secondPath = helpArray[1];
  let extension = secondPath.split(' ')[0];
  firstPath = `${firstPath}.${extension}`;
  secondPath = secondPath.substring(extension.length + 1);
  if (sections === 3) {
    secondPath += `.${helpArray[2]}`;
  }
  extractedPaths.push(firstPath, secondPath);
  return extractedPaths;
}

extractPaths('Documents/банкротство ТСД.pdf Documents/Translating Law.txt');
extractPaths('Documents/банкротство ТСД Documents/Translating Law');
extractPaths('Documents/банкротство ТСД.pdf Documents/Translating Law');
extractPaths('Documents/банкротство ТСД Documents/Translating Law.txt');