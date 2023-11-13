import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayPush',
    description: 'Push an element to an array.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Element',
            description: 'Element to be pushed.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [name, element] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        d.cache.arrays[name].push(element)
    }
})