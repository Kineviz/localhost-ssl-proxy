const  { Command } = require('commander');
const Path = require('path');
const fs = require('fs');
const { name, version } = require('../package.json');

const absolutePath = path => Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path);
const exists = path => fs.existsSync(absolutePath(path));

program =  new Command();
program
  .option('-c, --config <type>', 'config file')
  .option('-h, --hostname <type>', 'proxy name','localhost')
  .option('-p, --port <type>', 'proxy port',80)
  .option('-t, --targetPort <type>', 'proxy to localhost port',9443)
  .option('-s, --useSSL <type>', 'Use SSL',true)
  .option('--proxySSL <type>', 'Proxy SSL Site',false)
  .option('--useCORS <type>', 'Use CORS',true)
  .option('--sessionName <type>', 'Config sessionName');

program.version(`${name}  ${version}`, '-v, --version', 'output the current version');

 
module.exports = {
  exists,
  absolutePath,
  program
}