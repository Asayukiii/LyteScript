import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@var',
    description: 'Creates a environment variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            resolver: ParameterType.String,
            required: true
        },
        {
            name: 'Value',
            description: 'Variable value.',
            resolver: ParameterType.String,
            required: false,
            default: ''
        }
    ],
    execute: async function (d) {
        const [key, value = ''] = d.function!.compiled.parameters.map(p => p.value);
        (d.cache.vars??={})[key] = value
    }
})