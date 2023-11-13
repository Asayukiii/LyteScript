import { Client, ClientEvents, ClientOptions } from 'revkit'
import { VariableManager } from '../managers/Variable.js'
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
    private _commands = new CommandManager
    private _events = new EventManager
    private _interpreter = new Interpreter
    private _functions = new FunctionManager
    private _vars: VariableManager
    private _db: Database
    extraOptions: BotOptions
    constructor(data: BotOptions) {
        super(data)
        this._db = new Database(data.database)
        this.extraOptions = data
        this.functions.loadNatives()
        this.events.loadNatives(data.events ?? [], this)
        this._db.start()
        this._vars = new VariableManager(data.database?.tables ?? ['main'], this._db)
    }

    /**
     * Set the client variables.
     * @param data Variable entries.
     * @param table Table name.
     */
    variables(data: Record<string, any>, table = 'main') {
        return this.vars.fillTable(data, table)
    }

    /**
     * Get the command manager.
     */
    get commands() {
        return this._commands
    }

    /**
     * Get the database.
     */
    get db() {
        return this._db
    }

    /**
     * Get the event manager.
     */
    get events() {
        return this._events
    }

    /**
     * Get the function manager.
     */
    get functions() {
        return this._functions
    }

    /**
     * Get the LyteScript interpreter.
     */
    get interpreter() {
        return this._interpreter
    }

    /**
     * Get the variable manager.
     */
    get vars() {
        return this._vars
    }
}