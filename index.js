#! /usr/bin/env node

import * as fs from 'fs/promises';
import os from 'os';
import process from 'process';
import { parseStartArgs } from './src/cli/parseStartArgs.js';
import { help } from './src/utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './src/utils/doesExist.js';
import { list, listDirectory } from './src/fs/listDirectory.js';
import { calculateHash } from './src/utils/calcHash.js';
import { getAbsolutePath } from './src/utils/getAbsolutePath.js';
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import { read } from './src/fs/readFile.js';
import { create } from './src/fs/createFile.js';
import { rename } from './src/fs/renameFile.js';
import { copy } from './src/fs/copyFile.js';
import { move } from './src/fs/moveFile.js';
import { remove } from './src/fs/deleteFile.js';
import { commandClosingMsg } from './src/utils/commandClosingMsg.js';

export let cwd = os.homedir();

function fileManager() {

  const userName = parseStartArgs();
  
  process.chdir(cwd);

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
  process.stdout.write(`You are currently in: ${cwd}\n`);
  process.stdout.write('Type "help" to see all available commands.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', async (line) => {
    const lineToString = line.toString().trim();
    const [command, ...args] = lineToString.split(" ");
    switch (command) {
      case ".exit": 
      case "exit": {
        process.stdout.write(`Thank you for using File Manager, ${userName}!`);
        process.exit();
      };
      case "help": {
        help();
        commandClosingMsg(cwd);
        break;
      };
      case "cd": {
        if (args.length > 0) {
          cwd = path.join(cwd, args.join(' '));
          const doesExistPath = await doesExist(cwd);
          if (doesExistPath) {
            // printCurrentDirectory(cwd);
            process.chdir(cwd);
            commandClosingMsg(cwd);
          } else {
            process.stdout.write(`No such directory ${cwd} exists.\n`);
            commandClosingMsg(cwd);
          }
        }
        break;
      };
      case "up": {
        if (cwd === os.homedir()) {
          process.stdout.write(`You are already in the root directory: ${os.homedir()}\nEnter command or type "help":\n`);
        } else {
          cwd = path.join(cwd, '..');
          process.chdir(cwd);
          commandClosingMsg(cwd);
        }
        break;
      };
      case "ls": {
        await listDirectory(cwd);
        // await list(cwd);
        commandClosingMsg(cwd);
        break;
      };
      case "cat": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          const absolutePath = getAbsolutePath(userPath, cwd);
          const doesExistPath = await doesExist(absolutePath);
          if (doesExistPath) {
            await read(absolutePath);
            commandClosingMsg(cwd);
          } else {
            process.stdout.write(`No such file or directory ${args.join(' ')}\n`);
            commandClosingMsg(cwd);
          }
        } else {
          process.stdout.write(`You need to specify the path to the file after "cat".\n`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "add": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          const absolutePath = getAbsolutePath(userPath, cwd);
          await create(absolutePath);
          // process.stdout.write(`You are currently in: ${cwd}\nEnter next command or type "help":\n`);
          commandClosingMsg(cwd);
        } else {
          process.stdout.write(`You need to specify the path to the file after "add".\n`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "rn": {
        if (args.length > 1) {
          const fileToRename = args.slice(0, -1).join(' ');
          const newName = args[args.length - 1];
          await rename(fileToRename, newName, cwd);
        } else {
          process.stdout.write(`You need to specify current file name and new file name after "rn".\n`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "cp": {
        if (args.length > 1) {
          const fileToCopy = args.slice(0, -1).join(' ');
          const newDestination = args[args.length - 1];
          await copy(fileToCopy, newDestination, cwd);
        } else {
          process.stdout.write(`You need to specify current file path and new file path after "cp".\n`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "mv": {
        if (args.length > 1) {
          const fileToMove = args.slice(0, -1).join(' ');
          const newDestination = args[args.length - 1];
          await move(fileToMove, newDestination, cwd);
        } else {
          process.stdout.write(`You need to specify the file to move and new destination path after "mv".\n`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "rm": {
        if (args.length > 0) {
          const fileToDelete = args.join(' ');
          await remove(fileToDelete, cwd);
        } else {
          process.stdout.write(`You need to specify the file to delete "rm".\n`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "os": {
        if (args.length > 0 && args[0].startsWith('--')) {
          const arg = args[0].slice(2);
          switch (arg) {
            case "homedir": {
              process.stdout.write(`${os.homedir()}\n`);
              commandClosingMsg(cwd);
              break;
            };
            case "architecture": {
              process.stdout.write(`${os.arch()}\n`);
              commandClosingMsg(cwd);
              break;
            };
            case "cpus": {
              const cpuCores = os.cpus();
              cpuCores.map((item, i) => {
                console.dir(item);
              });
              commandClosingMsg(cwd);
              break;
            };
            case "EOL": {
              console.log(JSON.stringify(os.EOL));
              commandClosingMsg(cwd);
              break;
            };
            case "username": {
              console.log(os.userInfo().username);
              commandClosingMsg(cwd);
              break;
            };
            default: {
              process.stdout.write(`No such command ${arg}\n`);
              commandClosingMsg(cwd);
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
            process.stdout.write(`Hash for the file: ${userPath} is: ${hash}\n`);
            commandClosingMsg(cwd);
          } else {
            process.stdout.write(`No such file or directory ${userPath} exists.\n`);
            commandClosingMsg(cwd);
          }
        }
        break;
      }
      case "compress": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          const absolutePath = getAbsolutePath(userPath, cwd);
          const doesExistPath = await doesExist(absolutePath);
          if (doesExistPath) {
            await compress(absolutePath, `${absolutePath}.gz`);
            commandClosingMsg(cwd);
          } else {
            process.stdout.write(`No such file or directory ${userPath} exists.\n`);
            commandClosingMsg(cwd);
          }
        } else {
          process.stdout.write(`Invalid path names for original and compressed files!\n`);
          commandClosingMsg(cwd);
        }
        break;
      }
      case "decompress": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          const compressededPath = args[0];
          const decompressedFilePath = args[1];
          const compressedAbsolutePath = getAbsolutePath(compressededPath, cwd);
          const decompressedAbsolutePath = getAbsolutePath(decompressedFilePath, cwd);
          const doesExistPath = await doesExist(compressedAbsolutePath);
          if (doesExistPath) {
            await decompress(compressedAbsolutePath, decompressedAbsolutePath);
            commandClosingMsg(cwd);
          } else {
            process.stdout.write(`No such file or directory ${userPath} exists.\n`);
            commandClosingMsg(cwd);
          }
        } else {
          process.stdout.write(`Invalid path names for original and compressed files!\n`);
          commandClosingMsg(cwd);
        }
        break;
      }
      default: {
        process.stdout.write(`Invalid command! Check the spelling!\n`);
        commandClosingMsg(cwd);
        break;
      };
    };  
  }).on('close', () => {console.log(`Thank you for using File Manager, ${userName}!`)});

};

fileManager();
