import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayJoin',
    description: 'Join the elements of an array.',
    parameters: [
        {
            name: 'Name',
            description: 'Array name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Separator',
            description: 'Element separator to join the array.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, sep = ','] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.arrays || !d.cache.arrays[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        return d.cache.arrays[name].join(sep)
    }
})