# gb24-Frontend
This is the frontend server for the Gulbergen24 Lap System. It receives data from the core server and displays it in real time with websockets.

## Installation

```sh
npm install && grunt
```

## Run
Start build with

```sh
npm start
```

or dev with

```sh
npm run-script dev
```

## Configuration
Settings are loaded from `server/config/config.yaml` and then parsed by `server/config/index.js`. Command-line args override these settings

Key                  | Description                                                               | Default
-------------------- | ------------------------------------------------------------------------- | ---------
`mysql_pool_options` | An object of options. These are passed directly into `mysql.createPool()` | `{}`
`webserver_port`     | The port to listen on                                                     | `8080`
`webserver_bind`     | The ip to bind to                                                         | `0.0.0.0`
