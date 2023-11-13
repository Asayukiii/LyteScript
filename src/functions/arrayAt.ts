import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayAt',
    description: 'Returns the element of an array at the provided index.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Index',
            description: 'Element index.',
            type: ParameterType.Number,
            required: true
        }
    ],
    execute: async function (d) {
        const [name, index] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        return d.cache.arrays[name][Number(index)]
    }
})