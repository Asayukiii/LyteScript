import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@if',
    description: 'Evaluate and execute code if the condition is met or not.',
    parameters: [
        {
            name: 'Condition',
            description: 'The condition to evaluate.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Then',
            description: 'Code to execute if the condition is met.',
            type: ParameterType.String,
            required: true,
            compile: false
        },
        {
            name: 'Else',
            description: 'Code to execute if the condition is not met.',
            type: ParameterType.String,
            required: false,
            compile: false
        }
    ],
    execute: async function (d) {
        const [condition, then, ifnot] = d.function!.compiled.parameters.map(t => t.value)
        const resolved = d.condition.resolve(condition)
        let run = ''
        if (resolved) {
            run = (await d.interpreter.evaluate(then, d)).code
        } else if (!resolved && ifnot) {
            run = (await d.interpreter.evaluate(ifnot, d)).code
        }
        if (run) return run
    }
})