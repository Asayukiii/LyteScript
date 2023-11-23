import { NativeFunction, ParameterType } from '../main.js'
import * as _ from 'lodash'

export default new NativeFunction({
    name: '@objectSet',
    description: 'Set a object property.',
    parameters: [
        {
            name: 'Name',
            description: 'Object name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Path',
            description: 'The property path.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Value',
            description: 'Property value.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [name, path, value] = d.function!.compiled.parameters.map(t => t.value)
        if (!d.cache.objects || !d.cache.objects[name])
            throw new Error('Invalid array name provided in: ' + d.function?.compiled.name)
        _.set(d.cache.objects[name], path, value)
    }
})