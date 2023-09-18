# find-a-port

> Get an available [TCP port]

## Install

```sh
npm install find-a-port
```

## Usage

```js
import findAvailablePort from 'find-a-port';

console.log(await findAvailablePort());
//=> 49749
```

Pass in a desired port:

```js
import findAvailablePort from 'find-a-port';

console.log(await findAvailablePort(4321));
// Will use 4321 if available, if not get a random port
```
