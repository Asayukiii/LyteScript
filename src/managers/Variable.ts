/**
 * Represents a variable manager.
 */
export class VariableManager {
    _data: Record<string, any> = {}

    /**
     * Add a variable into the manager.
     * @param name Variable name.
     * @param data Variable data.
     */
    add(name: string, data: any) {
        this._data[name] = data
        return this
    }

    /**
     * Get a variable.
     * @param name Variable name.
     */
    get(name: string) {
        if (!this.exists(name)) throw new Error('Invalid variable name provided!')
        return this._data[name] ?? undefined
    }

    /**
     * Check if the provided variable name exists.
     * @param name Variable name.
     */
    exists(name: string) {
        return name in this._data
    }

    /**
     * Delete a variable from the manager.
     * @param name Variable name.
     */
    delete(name: string) {
        delete this._data[name]
        return this
    }

    /**
     * Delete all variables from the manager.
     */
    cleanup() {
        this._data = {}
        return this
    }
}