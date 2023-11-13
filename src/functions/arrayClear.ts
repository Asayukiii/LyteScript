import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayClear',
    description: 'Clears all elements from an array.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [name] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        d.cache.arrays[name].length = 0
    }
})