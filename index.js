#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { parseStartArgs } from './src/cli/parseStartArgs.js';
import { help } from './src/utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './src/utils/doesExist.js';
import { list, listDirectory } from './src/fs/listDirectory.js';
import { printCurrentDirectory } from './src/utils/cwd.js';
import { calculateHash } from './src/utils/calcHash.js';
import { getAbsolutePath } from './src/utils/getAbsolutePath.js';

export let cwd = os.homedir();

function fileManager() {

  const userName = parseStartArgs();
  
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
    const [command, ...args] = lineToString.split(" ");
    switch (command) {
      case ".exit": 
      case "exit": {
        process.stdout.write(`Thank you for using File Manager, ${userName}!`);
        process.exit();
      };
      case "help": {
        help();
        process.stdout.write(`Enter next command or type "help":\n`);
        break;
      };
      case "cd": {
        if (args.length > 0) {
          cwd = path.join(cwd, args.join(' '));
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
        // await list(cwd);
        printCurrentDirectory(cwd);
        break;
      }
      case "os": {
        if (args.length > 0 && args[0].startsWith('--')) {
          const arg = args[0].slice(2);
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
        break;
      }
      case "hash": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          const absolutePath = getAbsolutePath(userPath, cwd);
          const doesExistPath = await doesExist(absolutePath);
          if (doesExistPath) {
            const hash = await calculateHash(absolutePath);
            process.stdout.write(`Hash for the file: ${userPath} is: ${hash}\nEnter next command or type "help":\n`);
          } else {
            process.stdout.write(`No such file or directory ${userPath} exists.\nEnter next command or type "help":\n`);
          }
        }
        break;
      }
      default: {
        process.stdout.write(`Invalid input! Enter next command or type "help":\n`);
        break;
      };
    };  
  }).on('close', () => {console.log(`Thank you for using File Manager, ${userName}!`)});

};

fileManager();
