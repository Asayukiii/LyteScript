import { NativeFunction, ParameterType } from '../main.js'
import { inspect } from 'util'

export default new NativeFunction({
    name: '@jsEval',
    description: 'Evaluates JavaScript code.',
    parameters: [
        {
            name: 'Return',
            description: 'Return the evaluation result.',
            resolver: ParameterType.Boolean,
            required: true
        },
        {
            name: 'Code',
            description: 'JavaScript code to be evaled.',
            resolver: ParameterType.String,
            compile: false,
            required: true
        }
    ],
    execute: async function (d) {
        const [results, ...code] = d.function!.compiled.parameters.map(t => t.value) as unknown as [boolean, string]
        const nitecode = await d.interpreter.evaluate(code.join(';'), d)
        let result: any
        try {
            result = await eval(nitecode.code)
        } catch (e: any) {
            result = e
        }
        if (results === true)
            return typeof result === 'object' 
                ? inspect(results, { depth: 5 }) 
                : typeof result !== 'string' 
                    ? result.toString() : result
    }
})