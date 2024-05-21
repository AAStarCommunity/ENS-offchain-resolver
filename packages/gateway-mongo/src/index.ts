import { makeApp } from './server';
// import { Command } from 'commander';
// import { readFileSync } from 'fs';
import { ethers } from 'ethers';
import { dbConnect } from './mongodb'
// const program = new Command();
// program
//   .requiredOption(
//     '-k --private-key <key>',
//     'Private key to sign responses with. Prefix with @ to read from a file'
//   )
//   // .requiredOption('-d --data <file>', 'JSON file to read data from')
//   // .option('-t --ttl <number>', 'TTL for signatures', '300')
//   .option('-p --port <number>', 'Port number to serve on', '8080');
// program.parse(process.argv);
// const options = program.opts();
let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const port = 8080
// if (privateKey.startsWith('@')) {
//   privateKey = ethers.utils.arrayify(
//     readFileSync(privateKey.slice(1), { encoding: 'utf-8' })
//   );
// }
const address = ethers.utils.computeAddress(privateKey);
const signer = new ethers.utils.SigningKey(privateKey);
const app = makeApp(signer, '/');
dbConnect();
console.log(`Serving on port ${port} with signing address ${address}`);
app.listen(port);