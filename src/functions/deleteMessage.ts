import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@deleteMessage',
    description: 'Delete a message.',
    parameters: [
        {
            name: 'Message ID',
            description: 'The message to react to.',
            type: ParameterType.Message,
            required: true
        },
        {
            name: 'Channel ID',
            description: 'Channel were message is in.',
            type: ParameterType.Channel,
            required: false,
            default: 'd.ctx?.channel?.id'
        }
    ],
    execute: async function (d) {
        const [messageID, channelID = d.ctx!.channel!.id] = d.function!.compiled.parameters.map(t => t.value)
        const channel = d.ctx?.server?.channels.get(channelID)
        if (!channel) throw new Error('Invalid channel ID provided in: ' + d.function?.compiled.name)
        const message = channel.messages.get(messageID)
        if (!message) throw new Error('Invalid message ID provided in: ' + d.function?.compiled.name)
        await message.delete().catch((e) => console.log(e))
    }
})