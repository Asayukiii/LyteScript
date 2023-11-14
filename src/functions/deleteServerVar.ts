import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@deleteServerVar',
    description: 'Delete a server variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'ID',
            description: 'Server ID.',
            type: ParameterType.String,
            required: false,
            default: 'd.ctx?.server?.id'
        }
    ],
    execute: async function (d) {
        const [name, serverId = d.ctx?.server?.id] = d.function!.compiled.parameters.map(t => t.value)
        await d.client?.vars.delete(`${name}_${serverId}`)
    }
})