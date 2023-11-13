import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayForEach',
    description: 'Executes a code for each array element.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Code',
            description: 'The code to execute.',
            type: ParameterType.String,
            required: true,
            compile: false
        },
        {
            name: 'Separator',
            description: 'Code result separator.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, code, sep = ','] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        const results: string[] = []
        for (const element of d.cache.arrays[name]) {
            const data = d.extend({
                client: d.client,
                functions: d.functions,
                ctx: d.ctx,
                cache: { vars: {} },
                interpreter: d.interpreter
            })
            data.cache.vars['element'] = element
            const result = await data.interpreter.evaluate(code, data)
            if (result.code) results.push(result.code)
        }
        return results.join(sep)
    }
})