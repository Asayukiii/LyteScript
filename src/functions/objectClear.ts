import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@objectClear',
    description: 'Clear all values from an object.',
    parameters: [
        {
            name: 'Name',
            description: 'Object name.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [name] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.objects || !d.cache.objects[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        d.cache.objects[name] = {}
    }
})