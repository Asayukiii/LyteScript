import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@ternary',
    description: 'Execute a ternary statement.',
    parameters: [
        {
            name: 'Condition',
            description: 'Condition to be solved.',
            resolver: ParameterType.String,
            required: true
        },
        {
            name: 'Then',
            description: 'Text to return if the condition is met.',
            resolver: ParameterType.String,
            required: true
        },
        {
            name: 'Else',
            description: 'Text to return if the condition is not met.',
            resolver: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [condition, then, ifnot] = d.function!.compiled.parameters.map(t => t.value)
        const result = d.condition.resolve(condition)
        return result ? then : ifnot
    }
})