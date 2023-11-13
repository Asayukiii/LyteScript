import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayLastIndexOf',
    description: 'Returns the index of the last element that match the word.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Word',
            description: 'The word to match.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [name, search] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        return d.cache.arrays[name].lastIndexOf(search)
    }
})