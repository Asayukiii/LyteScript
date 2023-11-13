import { NativeFunction } from '../main.js'
import { readdirSync } from 'fs'
import { join } from 'path'

/**
 * Represents a function manager.
 */
export class FunctionManager {
    _data: Record<string, Omit<NativeFunction, 'name'>> = {}

    /**
     * Add a function into the manager.Ñ
     * @param functions 
     */
    add(...functions: NativeFunction[]) {
        for (let fn of functions) {
            if (fn.__path__) fn.__path__ = 'LyteScript:MAIN_FILE'
            this.import(fn.name, fn)
        }
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
                let fn: NativeFunction = require(join(root, file)).default
                if (fn) {
                    fn.__path__ = join(root, file)
                    this.import(fn.name, fn)
                }
            }
        })
    }

    /**
     * @private Add a native function to the manager.
     * @param name Native function name.
     * @param data Native function data.
     */
    private import(name: string, data: NativeFunction) {
        const nome = name.startsWith('@') ? name.toLowerCase() : '@' + name.toLowerCase()
        if (!data.name) data.name = nome
        this._data[nome] = data
        return this
    }
}