#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { parseStartArgs } from './src/cli/parseStartArgs.js';
import { help } from './src/utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './src/utils/doesExist.js';
import { isDirectory } from './src/utils/isDirectory.js';

function fileManager() {

  const userName = parseStartArgs();

  let cwd = os.homedir();
  process.chdir(cwd);

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  process.stdout.write('Type "help" to see all available commands.\n');
  process.stdout.write(`You are currently in: ${cwd}\nEnter your command:\n`);
  // const currentFilePath = fileURLToPath(import.meta.url);
  // console.log( `currentFilePath: ${currentFilePath}`);
  // process.stdout.write(`Dirname is: ${getDirname(import.meta.url)}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (line) => {
    const lineToString = line.toString().trim();
    const commandArray = lineToString.split(" ");
    switch (commandArray[0]) {
      case ".exit": {
        process.stdout.write(`Thank you for using File Manager, ${userName}!`);
        process.exit();
      };
      case "exit": {
        process.stdout.write(`Thank you for using File Manager, ${userName}!`);
        process.exit();
      };
      case "help": {
        help();
        break;
      };
      case "cd": {
        if (commandArray.length > 1) {
          cwd = path.join(cwd, commandArray.slice(1).join(' '));
          const doesExistPath = await doesExist(cwd);
          if (doesExistPath) {
            process.chdir(cwd);
            process.stdout.write(`You are now in: ${cwd}\n`);
          } else {
            process.stdout.write(`No such directory ${cwd} exists.\nEnter your command or type "help":\n`);
          }
        }
        break;
      }
      case "up": {
        console.log(`os.homedir(): ${os.homedir()}`);
        if (cwd === os.homedir()) {
          process.stdout.write(`You are already in the root directory: ${os.homedir()}\n`);
        } else {
          cwd = path.join(cwd, '../');
          if (cwd === os.homedir()) {
            process.stdout.write(`You are already in the root directory: ${os.homedir()}\n`);
          } else {
            process.chdir(cwd);
            process.stdout.write(`You are now in: ${cwd}\n`);
          }
        }
        break;
      }
      default: {
        process.stdout.write(`Invalid input, type "help" to see available commands.\n`);
        break;
      };
    };  
  }).on('close', () => {console.log(`Thank you for using File Manager, ${userName}!`)});

// process.stdin.on("data", (chunk) => {
//   const chunkToString = chunk.toString().trim();

//   const commandArray = chunkToString.split(" ");

//   switch (chunkToString) {
//     case ".exit" || "exit": {
//       process.stdout.write(`Thank you for using File Manager, ${userName}!\n`);
//       process.exit();
//     };
//   };  
// })
// process.stdin.on('SIGINT', () => console.log(`Thank you for using File Manager, ${userName}!\n`));

// process.on('SIGINT', () => {
//   console.log(`Thank you for using File Manager, ${userName}!\n`);
  // process.exit();
// });

  // process.on('SIGINT', cb())
};

fileManager();

// os.EOL and os.arch() - architecture

function getHomedir() {
  return process.env.HOME || process.env.USERPROFILE;
}

// сделал ее константой, 
// завел вторую переменную где храню текущую директорию, ее меняю в командами cd и up

// os.homedir(), os.userInfo().homedir

// у всех отрабатывает event на выход при нажатии ctrl + C ?

// process.on('SIGINT', cb())

// enter your command:${EOL}
// Подскажите пожалуйста, как SIGINT передать из свича в ридлайн?
// rl.on('SIGINT', rl.close())
// rl.on('close', () => ...)
// дак ловишь .exit и вызываешь rl.close()
// прям в on(line)