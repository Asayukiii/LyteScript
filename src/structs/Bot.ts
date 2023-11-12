import { Client, ClientEvents, ClientOptions } from 'revkit'
import { FunctionManager, Interpreter } from '../main.js'
import { CommandManager } from '../managers/Command.js'
import { EventManager } from '../managers/Event.js'
import { Database, DatabaseOptions } from 'midb'

/**
 * Bot constructor options.
 */
export interface BotOptions extends ClientOptions {
    database?: DatabaseOptions
    events?: (keyof ClientEvents)[]
    owners?: string[]
    prefixes: string[]
}

/**
 * Represents a NiteScript bot.
 */
export class Bot extends Client {
    commands = new CommandManager
    events = new EventManager
    interpreter = new Interpreter
    functions = new FunctionManager
    db: Database
    extraOptions: BotOptions
    constructor(data: BotOptions) {
        super(data)
        this.db = new Database(data.database)
        this.extraOptions = data
        this.functions.loadNatives()
        this.events.loadNatives(data.events ?? [], this)
        this.db.start()
    }
}