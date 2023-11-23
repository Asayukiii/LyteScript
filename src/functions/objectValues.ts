import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@objectValues',
    description: 'Join object values.',
    parameters: [
        {
            name: 'Name',
            description: 'Object name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Separator',
            description: 'Separator to join object values.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, sep = ','] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.objects || !d.cache.objects[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        return Object.values(d.cache.objects[name]).join(sep)
    }
})