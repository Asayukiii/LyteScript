import { Bot, NativeEvent } from '../main.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { ClientEvents } from 'revkit'

/**
 * Represents a event manager.
 */
export class EventManager {
    _data: Record<string, NativeEvent> = {}

    /**
     * Add a native function to the manager.
     * @param name Native function name.
     * @param data Native function data.
     */
    add(name: string, data: Omit<NativeEvent, 'name'>) {
        this._data[name] = data as NativeEvent
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
        return name.toLowerCase() in this._data
    }

    /**
     * Delete a function from the manager.
     * @param name Native function name.
     */
    delete(name: string) {
        delete this._data[name.toLowerCase()]
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
     */
    loadNatives(events: (keyof ClientEvents)[], client: Bot) {
        const root = __dirname.replace('managers', 'events')

        readdirSync(root).forEach(file => {
            if (file.endsWith('.js')) {
                const fn: NativeEvent = require(join(root, file)).default
                if (fn && events.includes(fn.name)) this.add(fn.name, fn)
            }
        })

        Object.values(this._data).forEach((event: NativeEvent) => {
            client.on(event.name, async (...args) => {
                await event.listen(client, ...args)
            })
        })
    }
}