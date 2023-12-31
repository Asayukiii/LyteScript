import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@ternary',
    description: 'Execute a ternary statement.',
    parameters: [
        {
            name: 'Condition',
            description: 'Condition to be solved.',
            type: ParameterType.String,
            required: true,
            unescape: false
        },
        {
            name: 'Then',
            description: 'Text to return if the condition is met.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Else',
            description: 'Text to return if the condition is not met.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [condition, then, ifnot] = d.function!.compiled.parameters.map(t => t.value)
        const result = d.condition.resolve(condition)
        return result ? then : ifnot
    }
})