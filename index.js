#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { parseStartArgs } from './src/cli/parseStartArgs.js';
import { help } from './src/utils/help.js';
import readline from 'readline';

function fileManager() {

const userName = parseStartArgs();

process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
process.stdout.write('Home directory is: ' + os.homedir() + '\n');
process.stdout.write(`You are currently in: ${process.cwd()} , enter your command:\n`);
process.stdout.write('Type "help" to see all available commands.\n');

help();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  const lineToString = line.toString().trim();

  const commandArray = lineToString.split(" ");

  switch (lineToString) {
    case ".exit" || "exit": {
      process.stdout.write(`Thank you for using File Manager, ${userName}!`);
      process.exit();
    };
    case "exit": {
      process.stdout.write(`Thank you for using File Manager, ${userName}!`);
      process.exit();
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