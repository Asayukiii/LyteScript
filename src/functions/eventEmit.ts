import { NativeFunction, ParameterType } from '../main.js'
import { CustomEvent } from '../structs/CustomEvent.js'

export default new NativeFunction({
    name: '@eventEmit',
    description: 'Emit a custom event.',
    parameters: [
        {
            name: 'Name',
            description: 'Custom event name/type.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Arguments',
            description: 'Arguments to be passed as parameter of the event.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, ...args] = d.function!.compiled.parameters.map(t => t.value)
        if (!(d.client?.customEvent instanceof CustomEvent))
            throw new Error('Cannot find a instanced CustomEvent class!')
        return d.client.customEvent.emit(name, args ?? null)
    }
})