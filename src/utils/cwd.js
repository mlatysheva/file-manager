export const printCurrentDirectory = (cwd) => {
  process.chdir(cwd);
  process.stdout.write(`You are now in: ${cwd}\nEnter next command or type "help":\n`);  
}