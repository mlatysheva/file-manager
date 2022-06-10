#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { parseStartArgs } from './src/cli/parseStartArgs.js';
import { help } from './src/utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './src/utils/doesExist.js';
import { list, listDirectory } from './src/fs/listDirectory.js';
import { calculateHash } from './src/utils/calcHash.js';
import { compress } from './src/zip/compress.js';
import { decompress } from './src/zip/decompress.js';
import { read } from './src/fs/readFile.js';
import { create } from './src/fs/createFile.js';
import { rename } from './src/fs/renameFile.js';
import { copy } from './src/fs/copyFile.js';
import { move } from './src/fs/moveFile.js';
import { remove } from './src/fs/deleteFile.js';
import { extractPaths } from './src/utils/extractPaths.js';
import { commandClosingMsg } from './src/utils/commandClosingMsg.js';

function fileManager() {

  let cwd = os.homedir();

  const userName = parseStartArgs();
  
  process.chdir(cwd);

  process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);
  process.stdout.write(`${os.EOL}You are currently in: ${cwd}${os.EOL}`);
  process.stdout.write(`${os.EOL}Type "help" to see all available commands.${os.EOL}${os.EOL}`);

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
        process.stdout.write(`${os.EOL}Thank you for using File Manager, ${userName}!${os.EOL}`);
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
            process.chdir(cwd);
            commandClosingMsg(cwd);
          } else {
            process.stdout.write(`${os.EOL}No such directory ${cwd} exists.${os.EOL}`);
            commandClosingMsg(cwd);
          }
        } else {
          process.stdout.write(`${os.EOL}Specify a valid directory after "cd".${os.EOL}`);
          commandClosingMsg(cwd);
        }
        break;
      };
      case "up": {
        if (cwd === os.homedir()) {
          process.stdout.write(`${os.EOL}You are already in your root directory: ${os.homedir()}${os.EOL}Enter command or type "help":${os.EOL}`);
        } else {
          cwd = path.join(cwd, '..');
          process.chdir(cwd);
          commandClosingMsg(cwd);
        }
        break;
      };
      case "ls": {
        // await listDirectory(cwd);
        await list(cwd);
        break;
      };
      case "cat": {
        if (args.length > 0) {
          const userPath = args.join(' '); 
          await read(userPath, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify a valid path after "cat".${os.EOL}`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "add": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          await create(userPath, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify a valid path to the file after "add".${os.EOL}`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "rn": {
        if (args.length > 1) {
          const [fileToRename, newName] = extractPaths(args.join(' '));
          await rename(fileToRename, newName, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify valid current file name and new file name after "rn".${os.EOL}`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "cp": {
        if (args.length > 1) {
          const [fileToCopy, newDestination] = extractPaths(args.join(' '));
          await copy(fileToCopy, newDestination, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify valid current file path and a new file path after "cp".${os.EOL}`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "mv": {
        if (args.length > 1) {
          const [fileToMove, newDestination] = extractPaths(args.join(' '));
          await move(fileToMove, newDestination, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify a valid path for the file to move and new destination path after "mv".${os.EOL}`);
          commandClosingMsg(cwd);
        };
        break;
      };
      case "rm": {
        if (args.length > 0) {
          const fileToDelete = args.join(' ');
          await remove(fileToDelete, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify a valid path for the file to delete after "rm".${os.EOL}`);
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
              process.stdout.write(`${os.EOL}No such command ${arg}. Type "help" to see available commands.${os.EOL}`);
              commandClosingMsg(cwd);
              break;
            };
          }
        } else {
          process.stdout.write(`${os.EOL}Specify a valid command after "os". Type "help" to see available commands.${os.EOL}`);
          commandClosingMsg(cwd);
        }
        break;
      }
      case "hash": {
        if (args.length > 0) {
          const userPath = args.join(' ');
          await calculateHash(userPath, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify a valid path for the file.${os.EOL}`);
          commandClosingMsg(cwd);
        }
        break;
      }
      case "compress": {
        if (args.length > 1) {
          const [fileToCompress, compressedFileName] = extractPaths(args.join(' '));
          // const fileToCompress = args.slice(0, -1).join(' ');
          // const compressedFileName = args[args.length - 1];
          await compress(fileToCompress, compressedFileName, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify valid paths for the original and compressed files!${os.EOL}`);
          commandClosingMsg(cwd);
        }
        break;
      }
      case "decompress": {
        if (args.length > 1) {
          const fileToDecompress = args.slice(0, -1).join(' ');
          const decompressedFileName = args[args.length - 1];
          // const [fileToDecompress, decompressedFileName] = extractPaths(args.join(' '));
          await decompress(fileToDecompress, decompressedFileName, cwd);
        } else {
          process.stdout.write(`${os.EOL}Specify valid paths for the compressed and decompressed files!${os.EOL}`);
          commandClosingMsg(cwd);
        }
        break;
      }
      default: {
        process.stdout.write(`${os.EOL}Invalid input! Type "help" to see available commands.${os.EOL}`);
        commandClosingMsg(cwd);
        break;
      };
    };  
  }).on('close', () => {console.log(`${os.EOL}Thank you for using File Manager, ${userName}!`)});

};

fileManager();

// console.log(JSON.stringify(EOL));
// await pipeline или pipe с promisify(finished), то сможешь ловить ошибки в catch
// или используй readablestream.on('error', handlerError)