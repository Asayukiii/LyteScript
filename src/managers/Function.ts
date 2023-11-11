import { NativeFunction } from '../main.js'
import { lstatSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * Represents a function manager.
 */
export class FunctionManager {
    _data: Record<string, Omit<NativeFunction, 'name'>> = {}

    /**
     * Add a native function to the manager.
     * @param name Native function name.
     * @param data Native function data.
     */
    add(name: string, data: Omit<NativeFunction, 'name'>) {
        this._data[
            name.startsWith('@')
                ? name.toLowerCase() 
                : '@' + name.toLowerCase()
        ] = data
        return this
    }

    /**
     * Get a native function.
     * @param name Native function name.
     */
    get(name: string) {
        return this._data[
            name.startsWith('@')
                ? name.toLowerCase() 
                : '@' + name.toLowerCase()
        ] ?? undefined
    }

    /**
     * Check if the provided function name exists.
     * @param name Native function name.
     */
    exists(name: string) {
        return (name.startsWith('@') ? name.toLowerCase() : '@' + name.toLowerCase()) in this._data
    }

    /**
     * Delete a function from the manager.
     * @param name Native function name.
     */
    delete(name: string) {
        delete this._data[
            name.startsWith('@')
                ? name.toLowerCase() 
                : '@' + name.toLowerCase()
        ]
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
    loadNatives() {
        const root = __dirname.replace('managers', 'functions')
        readdirSync(root).forEach(file => {
            if (file.endsWith('.js')) {
                const fn: NativeFunction = require(join(root, file)).default
                if (fn) this.add(fn.name, fn)
            }
        })
    }
}