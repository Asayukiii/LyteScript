<h1 align="center">LyteScript</h1>
A powerful TypeScript library to create Revolt bots with ease.

<h2>Basic Setup</h2>

```js
const { Bot } = require('lytescript')

const client = new Bot({
    token: string,
    prefix: string | string[]
})
```

<h2>Syntax</h2>
LyteScript has a basic syntax to create your codes.
<h3>Prefix</h3>
Every LyteScript function starts with "@" as prefix. Every text starting with "@"
will be interpreted as function, if the function doesn't exists, it won't be interpreted.
<h3>Parameter container</h3>
Functions can contain parameters or not. Function parameters must be delimited with "[" and "]". Example: @function[inside]
<h3>Multiple parameters</h3>
Functions can contain multiple parameters, each parameter must be separated with ";". Example: @function[param1;param2;...]

<h2>⚠️ This library reads from top to bottom and never the opposite.</h2>