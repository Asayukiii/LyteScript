import { NativeFunction, ParameterType } from '../main.js'
import { parse } from 'hjson'

export default new NativeFunction({
    name: '@objectCreate',
    description: 'Creates a new object.',
    parameters: [
        {
            name: 'Name',
            description: 'Object name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Object',
            description: 'The string object to parse.',
            type: ParameterType.Object,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, obj = '{}'] = d.function!.compiled.parameters.map(t => t.value);
        try {
            (d.cache.objects??={})[name] = parse(obj)
        } catch (e: any) {
            throw new Error('Cannot parse the object!\n' + e)
        }
    }
})