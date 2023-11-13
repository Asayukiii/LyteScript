import { lstatSync, readdirSync } from 'fs'
import { ClientEvents } from 'revkit'
import { randomUUID } from 'crypto'
import { join } from 'path'

export interface ICommand {
    type: keyof ClientEvents
    code: string
    name?: string
    aliases?: string[]
    __path__?: string
}

/**
 * Represents a command manager.
 */
export class CommandManager {
    _data: Record<string, ICommand> = {}

    /**
     * Add multiple commands into the manager.
     * @param data Command objects.
     */
    add(...commands: ICommand[]) {
        for (let command of commands) {
            command.__path__ = 'LyteScript:MAIN_FILE'
            const name = command.name ?? randomUUID()
            if (!command.name) command.name = name
            this.import(name, command)
        }
        return this
    }

    /**
     * Get a command.
     * @param name command name.
     */
    get(name: string) {
        return this._data[name] ?? undefined
    }

    /**
     * Check if the provided command name exists.
     * @param name command name.
     */
    exists(name: string) {
        return name in this._data
    }

    /**
     * Delete a command from the manager.
     * @param name command name.
     */
    delete(name: string) {
        delete this._data[name]
        return this
    }

    /**
     * Delete all commands from the manager.
     */
    cleanup() {
        this._data = {}
        return this
    }

    /**
     * Load all commands.
     * @param {string} [dir='commands'] Command path.
     */
    async load(dir = 'commands') {
        const root = process.cwd(), files = readdirSync(join(root, dir))
        for (const file of files) {
            const stat = lstatSync(join(root, dir, file))
            if (stat.isDirectory()) {
                await this.load(join(dir, file))
                continue
            } else if (file.endsWith('.js')) {
                let command: ICommand | ICommand[] = require(join(root, dir, file)).default
                if (command && Array.isArray(command)) {
                    command.forEach(cmd => {
                        if (!cmd.__path__) cmd.__path__ = join(root, dir, file)
                        this.import(cmd.name ?? randomUUID(), cmd)
                    })
                } else if (command) {
                    if (!command.__path__) command.__path__ = join(root, dir, file)
                    this.import(command.name ?? randomUUID(), command)
                }
            }
        }
    }

    /**
     * Import a command to the manager.
     * @param name command name.
     * @param data command data.
     */
    private import(name: string, data: Omit<ICommand, 'name'>) {
        this._data[name ?? randomUUID()] = data
        return this
    }
}