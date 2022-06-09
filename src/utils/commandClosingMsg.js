export function commandClosingMsg(cwd) {
  process.stdout.write(`You are currently in: ${cwd}\nEnter command or type "help":\n`);
}