#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { parseStartArgs } from './src/cli/parseStartArgs.js';
import { help } from './src/utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './src/utils/doesExist.js';
import { listDirectory } from './src/fs/listDirectory.js';
import { printCurrentDirectory } from './src/utils/cwd.js';
import { calculateHash } from './src/utils/calcHash.js';

function fileManager() {

  const userName = parseStartArgs();

  let cwd = os.homedir();
  process.chdir(cwd);

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  process.stdout.write('Type "help" to see all available commands.\n');
  process.stdout.write(`You are currently in: ${cwd}\nEnter your command:\n`);

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
            printCurrentDirectory(cwd);
          } else {
            process.stdout.write(`No such directory ${cwd} exists.\nEnter next command or type "help":\n`);
          }
        }
        break;
      }
      case "up": {
        if (cwd === os.homedir()) {
          process.stdout.write(`You are already in the root directory: ${os.homedir()}\nEnter next command or type "help":\n`);
        } else {
          cwd = path.join(cwd, '..');
          printCurrentDirectory(cwd);
        }
        break;
      }
      case "ls": {
        await listDirectory(cwd);
        printCurrentDirectory(cwd);
        break;
      }
      case "os": {
        if (commandArray.length > 1 && commandArray[1].startsWith('--')) {
          const arg = commandArray[1].slice(2);
          switch (arg) {
            case "homedir": {
              process.stdout.write(`${os.homedir()}\n`);
              break;
            };
            case "architecture": {
              process.stdout.write(`${os.arch()}\n`);
              break;
            };
            case "cpus": {
              const cpuCores = os.cpus();
              cpuCores.map((item, i) => {
                console.dir(item);
              });
              break;
            };
            case "EOL": {
              console.log(JSON.stringify(os.EOL));
              break;
            };
            case "username": {
              console.log(os.userInfo().username);
              break;
            };
            default: {
              process.stdout.write(`No such command ${arg}\n`);
              break;
            };
          }
        }
      }
      case "hash": {
        if (commandArray.length > 1) {
          const filePath = path.join(cwd, commandArray.slice(1).join(' '));
          const hash = await calculateHash(filePath);
          console.log(`Hash for the file: ${filePath} is: ${hash}`);
        }
      }
      default: {
        process.stdout.write(`Enter next command or type "help":\n`);
        break;
      };
    };  
  }).on('close', () => {console.log(`Thank you for using File Manager, ${userName}!`)});

};

fileManager();


function getHomedir() {
  return process.env.HOME || process.env.USERPROFILE;
}



// у всех отрабатывает event на выход при нажатии ctrl + C ?

// process.on('SIGINT', cb())

// enter your command:${EOL}
// Подскажите пожалуйста, как SIGINT передать из свича в ридлайн?
// rl.on('SIGINT', rl.close())
// rl.on('close', () => ...)
// дак ловишь .exit и вызываешь rl.close()
// прям в on(line)