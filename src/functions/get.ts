import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@get',
    description: 'Get a environment variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            resolver: ParameterType.String,
            required: true
        },
        {
            name: 'Default',
            description: 'The value to return if the variable does not exists.',
            resolver: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [key, def] = d.function!.compiled.parameters.map(p => p.value);
        return d.cache.vars?.[key] ?? def
    }
})