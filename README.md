# Notifications API with NodeJS

## API Architecture Design
<img src="./images/api-arch-design.png" alt="api architecture design"/>


## Installation

Make sure you have [nodejs](https://nodejs.dev/en/download/) installed.

Just run the following command to install npm packages:

```bash
npm install
```

Make sure you have access to [redis](https://redis.io/) server and you have to edit the redis credentials in the <a href="./.env">.env</a> file. 

```
REDIS_HOST = {Your_Redis_Host}
REDIS_PORT = {Your_Redis_Port} 
```

## 🚀 Usage

```bash
node index.js
```