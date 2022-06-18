const  { Command } = require('commander');
const Path = require('path');
const fs = require('fs');
const { name, version } = require('../package.json');

const absolutePath = path => Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path);
const exists = path => fs.existsSync(absolutePath(path));

program =  new Command();
program
  .option('-c, --config <type>', 'config file')
  .option('-h, --hostname <type>', 'Proxy hostname (default localhost)','localhost')
  .option('-p, --port <type>', 'proxy port',80)
  .option('-t, --targetPort <type>', 'proxy to localhost port',9443)
  .option('-s, --useSSL <type>', 'Use SSL',true)
  .option('--DNS <type>', 'Self-sign SSL DNS/IP (default localhost)',"localhost")
  .option('--proxySSL <type>', 'Proxy SSL Site',false)
  .option('--useCORS <type>', 'Use CORS',true)
  .option('--onlyWS <type>', 'onlyWS',false)
  .option('--staticPath <type>', 'Static web path, default is /staticPath','staticPath')
  .option('--staticDir <type>', 'Static files path')
  .option('--staticServer <type>', 'Static files server')
  .option('--sessionName <type>', 'Config sessionName');

program.version(`${name}  ${version}`, '-v, --version', 'output the current version');

 
module.exports = {
  exists,
  absolutePath,
  program
}