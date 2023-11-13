import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@solveCondition',
    description: 'Evaluate a condition.',
    parameters: [
        {
            name: 'Condition',
            description: 'Condition to be solved.',
            type: ParameterType.String,
            required: true,
            unescape: false
        }
    ],
    execute: async function (d) {
        const [condition] = d.function!.compiled.parameters.map(t => t.value)
        return d.condition.resolve(condition)
    }
})