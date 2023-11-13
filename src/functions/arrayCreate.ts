import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@arrayCreate',
    description: 'Creates a new array.',
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
        const [name, elements, sep = ','] = d.function!.compiled.parameters.map(t => t.value);
        (d.cache.arrays??={})[name] = elements.split(sep)
    }
})