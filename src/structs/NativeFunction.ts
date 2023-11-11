import { Data } from './Data.js'

type NativeFunctionOptions = {
    /**
     * Native function name.
     */
    name: string
    /**
     * Native function description.
     */
    description?: string,
    /**
     * Array of function parameters.
     */
    parameters?: {
        /**
         * Native function parameter name.
         */
        name: string
        /**
         * Native function parameter description.
         */
        description: string
        /**
         * Compiles the parameter, default set to true.
         */
        compile?: boolean
        /**
         * Unescapes the parameter, default set to true.
         */
        unescape?: boolean
        /**
         * Parameter type resolver, default set to "String".
         */
        resolver?: 'Boolean' | 'Object' | 'Number' | 'String'

    }[]
    execute: (d: Data) => Promise<any>
}

export class NativeFunction {
    name: string
    description?: string
    parameters?: {
        name: string
        description: string
        compile?: boolean
        resolver?: 'Boolean' | 'Object' | 'Number' | 'String'
    }[]
    execute: (d: Data) => Promise<any>
    constructor(data: NativeFunctionOptions) {
        this.name = data.name
        this.description = data.description
        this.parameters = data.parameters
        this.execute = data.execute
    }
}