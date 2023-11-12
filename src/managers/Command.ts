import { lstatSync, readdirSync } from 'fs'
import { ClientEvents } from 'revkit'
import { randomUUID } from 'crypto'
import { join } from 'path'

export interface ICommand {
    name?: string
    aliases?: string[]
    type?: keyof ClientEvents
    code: string
}

/**
 * Represents a command manager.
 */
export class CommandManager {
    _data: Record<string, ICommand> = {}

    /**
     * Add a native function to the manager.
     * @param name Native function name.
     * @param data Native function data.
     */
    add(name: string, data: Omit<ICommand, 'name'>) {
        this._data[name] = data
        return this
    }

    /**
     * Get a native function.
     * @param name Native function name.
     */
    get(name: string) {
        return this._data[name] ?? undefined
    }

    /**
     * Check if the provided function name exists.
     * @param name Native function name.
     */
    exists(name: string) {
        return name in this._data
    }

    /**
     * Delete a function from the manager.
     * @param name Native function name.
     */
    delete(name: string) {
        delete this._data[name]
        return this
    }

    /**
     * Delete all functions from the manager.
     */
    cleanup() {
        this._data = {}
        return this
    }

    /**
     * Load all native functions.
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
                const command: ICommand | ICommand[] = require(join(root, dir, file)).default
                if (command && Array.isArray(command)) {
                    command.forEach(cmd => this.add(cmd.name ?? randomUUID(), cmd))
                } else if (command) this.add(command.name ?? randomUUID(), command)
            }
        }
    }
}