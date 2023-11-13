import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayIncludes',
    description: 'Check if the value exists in an array.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Value',
            description: 'The value to match.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [name, search] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        return d.cache.arrays[name].includes(search)
    }
})