import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayUnshift',
    description: 'Adds elements to the beggining of an array.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Elements',
            description: 'Text to split into array elements.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Separator',
            description: 'Element separator to split the string.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, elements, sep = ','] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        d.cache.arrays[name].unshift(...elements.split(sep))
    }
})