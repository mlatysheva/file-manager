import os from 'os';

export function commandClosingMsg(cwd) {
  process.stdout.write(`${os.EOL}You are currently in: ${cwd}${os.EOL}Enter command or type "help":${os.EOL}`);
}