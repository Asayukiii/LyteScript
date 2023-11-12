import { CommandManager, ICommand } from './managers/Command.js'
import { NativeFunction } from './structs/NativeFunction.js'
import { FunctionManager } from './managers/Function.js'
import { NativeEvent } from './structs/NativeEvent.js'
import { Interpreter } from './core/Interpreter.js'
import { Condition } from './core/Condition.js'
import { Context } from './structs/Context.js'
import { Compiler } from './core/Compiler.js'
import { Data } from './structs/Data.js'
import { Util } from './utils/Util.js'
import { Bot } from './structs/Bot.js'

import x from './extenstions' // Extended String prototype.

/**
 * Character escapers to avoid bugs.
 */
const escapers = [
    ['#COLON#', ':'],
    ['#SEMI#', ';'],
    ['#DOL#', '$'],
    ['#LEFT#', '['],
    ['#RIGHT#', ']']
]

function escape(text: string) {
    for (const escaper of escapers)
        text = text.toString().replace(new RegExp(`${escaper[1]}`, 'ig'), escaper[0])
    return text
}

function unescape(text: string) {
    for (const escaper of escapers)
        text = text.toString().replace(new RegExp(`${escaper[0]}`, 'ig'), escaper[1])
    return text
}

export {
    escape, unescape,
    Bot,
    Condition,
    Context,
    CommandManager,
    Compiler,
    Data,
    FunctionManager,
    ICommand,
    Interpreter,
    NativeFunction,
    NativeEvent,
    Util
}