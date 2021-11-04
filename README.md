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

`-h` or `--hostname` Proxy hostname (default localhost)

`-p` or `--port` Proxy port (default 80)

`-t` or `--targetPort` Proxy to localhost port (default 9443)

`-s` or `--useSSL` Enable https (default true)

`-v` or `--version` Print version and exit

`-c` or `--config` Use config.json  


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
  }
}
```

And run the proxy with the configuration file:
```sh
localhost-ssl-proxy --config config.json
```

### Docker

> Use docker must use hostname (IP or docker.internal.host )

```
docker run -d -it \
--restart always  \
--name localhost-ssl-proxy \
-p 9443:9443 \
kineviz/localhost-ssl-proxy:latest \
-p 8008 -h docker.internal.host  
```

docker-compose refer ./docker-compose-demo
```
cd docker-compose-demo \
&& \
docker-compose up -d

```
then copy the ./docker-compose-demo/nebula_http_cors_request_demo.js to **"chrome develop tool"** > **"console"**, then enter to run.
### Thanks
 

Inspired by <https://github.com/cameronhunter/local-ssl-proxy>