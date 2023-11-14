import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@deleteChannelVar',
    description: 'Delete a channel variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'ID',
            description: 'Channel ID.',
            type: ParameterType.String,
            required: false,
            default: 'd.ctx?.channel?.id'
        }
    ],
    execute: async function (d) {
        const [name, channelID = d.ctx?.channel?.id] = d.function!.compiled.parameters.map(t => t.value)
        await d.client?.vars.delete(`${name}_${channelID}`)
    }
})