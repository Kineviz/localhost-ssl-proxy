const  { program } = require('commander');
const Path = require('path');
const fs = require('fs');
const { name, version } = require('../package.json');

const absolutePath = path => Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path);
const exists = path => fs.accessSync(absolutePath(path));

program
  .option('-c, --config', 'config file')
  .option('-h, --hostname <type>', 'proxy name','localhost')
  .option('-p, --port <type>', 'proxy port','80')
  .option('-t, --target-port <type>', 'proxy to localhost port','9443')
  .option('--use-SSL <type>', 'Use SSL',true);
program.version(`${name}  ${version}`, '-v, --version', 'output the current version');

 
module.exports = {
  exists,
  absolutePath,
  program
}