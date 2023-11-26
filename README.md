<h1 align="center">LyteScript</h1>
A powerful TypeScript library to create Revolt bots with ease.

<h2>Basic Setup</h2>

```js
const { Bot } = require('lytescript')

const client = new Bot({
    database?: DatabaseOptions,
    events?: string[],
    prefixes: string[]
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

<h2>Commands</h2>
Command Manager lets you add your own commands.
<h3>Main File</h3>
Add your commands in your main file.

```js
const bot = new Bot({...})
bot.commands.add({
    name: 'ping',
    type: 'message',
    code: `
        @sendMessage[
            @setContent[Pong! <#AT#@author[id]>]
        ]
    `
})
```
<h3>Loader</h3>
Load commands from a directory. (Directory must be absolute)

```js
const bot = new Bot({...})
bot.commands.load('./commands_path/').then(async () => {
    console.log('Commands loaded')
    await bot.login('<TOKEN>', 'bot')
})
```

<h4>In-file command</h4>

```js
/** @type {import('lytescript').ICommand} */
module.exports['default'] = {
    name: 'ping',
    type: 'message',
    code: `
        @sendMessage[
            @setContent[Pong! <#AT#@author[id]>]
        ]
    `
} // <- This can be an array too.
```

<h2>Events</h2>
To run all commands you declared you must declare its types in bot constructor options. If you don't do this, the event won't be listened.

```js
const bot = new Bot({
    events: [
        'message',
        'ready'
    ],
    prefixes: ['!']
})
bot.commands.add({
    name: 'ping',
    type: 'message',
    code: `
        @sendMessage[
            @setContent[Pong! <#AT#@author[id]>]
        ]
    `
}).add({
    type: 'ready',
    code: `
        @log[Client started: Name => @client[name]]
    `
})
```

<h2>Database</h2>
LyteScript provides native support for a built-in database. Just configure as you want and you're ready to go.

```js
const { Bot } = require('lytescript')

const bot = new Bot({
    database: {
        path: './mydb',
        tables: ['main']
    },
    events: ['ready'],
    prefixes: ['!']
})

bot.commands.add({
    type: 'ready',
    code: `
        @setVar[msg;Hello world!]
        @log[@getVar[msg]] // Hello world!
    `
})
```

<h2>Custom Functions</h2>
Function Manager provides the possibility for adding your own functions.

```js
const bot = new Bot({...})
bot.functions.add({
    name: 'multipleSum',
    description: 'Sum multiple numbers.',
    parameters: [
        {
            name: 'Numbers',
            description: 'Numbers to sum.',
            type: ParameterType.Number,
            required: true
        }
    ],
    execute: async (d) => {
        const numbers = d.function.compiled.parameters.map(param => Number(param.value))
        let result = 0
        for (const nm of numbers)
            result = result + nm
        return result
    }
})
```

<h2>Useful resources</h2>
<ul>
    <li><a href="https://rvlt.gg/TY2nkSrb"> Revolt Server</a></li>
    <li><a href="https://lytescript.js.org/docs"> Guide</a></li>
</ul>

<h2>⚠️ This library reads from top to bottom and never the opposite.</h2>