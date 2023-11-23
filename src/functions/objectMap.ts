import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@objectMap',
    description: 'Executes a code for each object entry.',
    parameters: [
        {
            name: 'Name',
            description: 'Object name.',
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
        if (!d.cache.objects || !d.cache.objects[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        const results: string[] = []
        for (const [key, value] of d.cache.objects[name]) {
            const data = d.extend({
                client: d.client,
                functions: d.functions,
                ctx: d.ctx,
                cache: { vars: {} },
                interpreter: d.interpreter
            })
            data.cache.vars['key'] = key
            data.cache.vars['value'] = typeof value === 'object' 
                ? JSON.stringify(value)
                : typeof value !== 'string' 
                    ? value.toString() : value
            const result = await data.interpreter.evaluate(code, data)
            if (result.code) results.push(result.code)
        }
        return results.join(sep)
    }
})