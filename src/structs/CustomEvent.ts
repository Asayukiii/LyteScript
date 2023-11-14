import { Bot, CommandManager, Context, Data } from '../main.js'
import { TypedEmitter } from 'tiny-typed-emitter'

export class CustomEvent extends TypedEmitter {
    private _bot: Bot
    private _commands = new CommandManager<any>
    constructor(bot: Bot) {
        super()
        this._bot = bot
        this._bot.customEvent = this
    }

    /**
     * Run a command if the event is emitted.
     * @param name Command name or type.
     */
    run(name: string) {
        if (!this.commands.exists(name)) throw new Error('Invalid custom event name provided!')
        this.on(name, async (...args) => {
            const commands = Object.values(this.commands._data).filter(x => x.name === name || x.type === name)
            for (const command of commands) {
                const data = new Data({
                    cache: {
                        eventData: args
                    },
                    ctx: new Context(null, this._bot),
                    functions: this._bot.functions,
                    interpreter:this._bot.interpreter,
                })
                await data.interpreter.evaluate(command.code, data)
            }
        })
    }

    /**
     * Get the command manager.
     */
    get commands() {
        return this._commands
    }
}