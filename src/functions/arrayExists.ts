import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayExists',
    description: 'Check if the given array name exists.',
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
        return d.cache.arrays && name in d.cache.arrays
    }
})