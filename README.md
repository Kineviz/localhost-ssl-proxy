## localhost-ssl-proxy


Let proxy to https localhost simply.

### Install

```sh
npm install -g localhost-ssl-proxy
```

or 

```sh
yarn global add localhost-ssl-proxy
```

### Run (proxy localhost)

To start a proxy from port `http://localhost:8008` to `https://localhost:9443` run:
```sh
localhost-ssl-proxy --port 8008  
```

Start your web server on the target port (`9443` in the example) and navigate to `https://localhost:9443` ([http://localhost:8008](http://localhost:8008) in the example).


### Available Options:

`-h` or `--hostname`   Proxy hostname (default localhost)

`-p` or `--port`       Proxy port (default 80)

`-t` or `--targetPort` Proxy to localhost port (default 9443)

`-s` or `--useSSL`     Enable https (default true)

`-v` or `--version`    Print version and exit

`-c` or `--config`     Use config.json  

`--targetHostname`     Self-sign SSL DNS/IP (default localhost)

`--proxySSL`           Proxy host enable SSL (Default false, if proxy port is 443 will auto use SSL), default is proxy http/ws

`--useCORS`            Enable CORS (Default true)

`--staticPath`         Static web path (Default staticPath, will proxy to https://localhost:9443/staticPath)

`--staticDir`          Static files path (e.g.  /app/static, Only support one of staticDir and staticServer)

`--staticServer`       Static files staticServer (e.g. http://localhost:3000, Only support one of staticDir and staticServer)   
`--proxyServer`        ProxyServer (e.g. https://graphxrdev.kineviz.com)

 
### Advanced

You can also pass a configuration file, this helps sharing setups with team members. These can contain multiple proxies which `localhost-ssl-proxy` will open concurrently.

Example config:
```json
{
  "defaul ssl proxy": {
    "hostname": "demo.local",
    "port": 3001,
    "targetPort": 4001
  },
  "proxy to http only": {
    "useSSL":false,
    "hostname": "demo.local",
    "port": 3001,
    "targetPort": 4002
  },
    "proxy to neo4j bolt": {
    "useSSL":false,
    "hostname": "demo.local",
    "port": 7687,
    "targetPort": 4003
  },
    "proxy to neo4j bolt+s": {
    "useSSL":true,
    "hostname": "demo.local",
    "proxySSL":true,
    "port": 7687,
    "targetPort": 4003
  }
}
```

And run the proxy with the configuration file:
```sh
localhost-ssl-proxy --config config.json
```

### Docker

> Use docker must use hostname (IP or host.docker.internal )

```
docker run -d -it \
--restart always  \
--name localhost-ssl-proxy \
-p 9443:9443 \
kineviz/localhost-ssl-proxy:latest \
-p 8008 -h host.docker.internal  
```

### Examples

#### Neo4j bolt to bolt+s
bolt(192.168.1.101:7687) => bolt+s (localhost:9443)
```
localhost-ssl-proxy \
--port=7687 \
--hostname=192.168.1.101 \
```

#### Neo4j bolt+s to bolt+s
bolt+s(5e1a823de94a71e6655ba1260624d773.neo4jsandbox.com:7687) => bolt+s (localhost:9443)
```
localhost-ssl-proxy \
--port=7687 \
--hostname=5e1a823de94a71e6655ba1260624d773.neo4jsandbox.com \
--proxySSL=true
```
#### Nebula graph databse

docker-compose refer ./docker-compose-demo
```
cd docker-compose-demo \
&& \
docker-compose up -d

```
then copy the ./docker-compose-demo/nebula_http_cors_request_demo.js to **"chrome develop tool"** > **"console"**, then enter to run.


#### GraphXR embed app develop(for iframe)

Use the follow command to create graphXR app (refer https://create-react-app.dev/)
 
```
npx create-react-app graphxr-app
```

then install the @kineviz/graphxr-api (refer https://kineviz.github.io/graphxr-api-docs/)

```
yarn add @kineviz/graphxr-api
```

#### Handle the GraphXR cors domain issue.

https://GRAPHXR_SERVER  =>  https://localhost:9443    
http://localhost:3000   =>  https://localhost:9443/graphxr_app   

```
localhost-ssl-proxy --proxyServer=https://graphxrdev.kineviz.com --staticServer=http://localhost:3000 --staticPath=graphxr_app
```
Now you can use https://localhost:9443/graphxr_app to access the graphxr_app without cors domain issue.


### Thanks
 

Inspired by <https://github.com/cameronhunter/local-ssl-proxy>