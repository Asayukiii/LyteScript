/**
 * Represents a function parameter.
 */
class FunctionParameter {
    value = ''
    index = 0
    constructor(index: number, value: string) {
        this.index = index
        this.value = value
    }

    /**
     * Overwrites the parameter value.
     * @param value New parameter value.
     */
    overwrite(value: string) {
        this.value = value
    }
}

/**
 * Represents a compiled function.
 */
export class CompiledFunction {
    name = ''
    parameters: FunctionParameter[] = []

    /**
     * Set the name for this function.
     * @param name Function name.
     */
    setName(name: string) {
        this.name = name.trim()
    }

    /**
     * Appends a function parameter to this function.
     * @param value The value to append as parameter.
     */
    appendValue(value: string) {
        const parameter = new FunctionParameter(this.parameters.length, value)
        this.parameters.push(parameter)
    }

    get over() {
        return this.name + (this.parameters.length > 0 ? ('[' + this.parameters.map(t => t.value).join(';') + ']') : '')
    }
}