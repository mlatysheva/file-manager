export function commandClosingMsg(cwd) {
  process.stdout.write(`\nYou are currently in: ${cwd}\nEnter command or type "help":\n`);
}