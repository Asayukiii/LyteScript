import { NativeFunction, ParameterType } from '../main.js'
import { CustomEvent } from '../structs/CustomEvent.js'
import * as lodash from 'lodash'

export default new NativeFunction({
    name: '@eventData',
    description: 'Returns custom data from the event arguments.',
    parameters: [
        {
            name: 'Property',
            description: 'Property path to be returned.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [path] = d.function!.compiled.parameters.map(t => t.value)
        if (!(d.client?.customEvent instanceof CustomEvent))
            throw new Error('Cannot find a instanced CustomEvent class!')
        const data = lodash.get(d.cache.eventData, path)
        return typeof data === 'object' ? JSON.stringify(data) : typeof data !== 'string' ? data.toString() : data
    }
})