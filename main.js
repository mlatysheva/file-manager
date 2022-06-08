import { stdin as input, stdout as output} from 'node:process';
import * as readline from 'node:readline';

const rl = readline.createInterface({ input, output});
const answer = await rl.question('What is your name? ');
console.log(`Hello, ${answer}!`);
rl.close();