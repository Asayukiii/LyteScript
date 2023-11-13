import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@try',
    description: 'Try to execute a codeblock, catches any error.',
    parameters: [
        {
            name: 'Code',
            description: 'The code to try to execute.',
            type: ParameterType.String,
            required: true,
            compile: false
        },
        {
            name: 'Catch',
            description: 'Catch block.',
            type: ParameterType.String,
            required: true,
            compile: false
        },
        {
            name: 'Finally',
            description: 'Finally block.',
            type: ParameterType.String,
            required: false,
            compile: false
        }
    ],
    execute: async function (d) {
        const [code, catches, final] = d.function!.compiled.parameters.map(p => p.value)
        let result: string
        try {
            result = (await d.interpreter.evaluate(code, d)).code
        } catch (e: any) {
            (d.cache.vars??={})['error'] = e.message
            if (catches)
                result = (await d.interpreter.evaluate(catches, d)).code
        } finally {
            if (final)
                result = (await d.interpreter.evaluate(final, d)).code
        }
        // @ts-ignore
        if (result) return result
    }
})