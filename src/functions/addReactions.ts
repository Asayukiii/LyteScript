import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@addReactions',
    description: 'Add reactions to a message.',
    parameters: [
        {
            name: 'Message ID',
            description: 'The message to react to.',
            type: ParameterType.Message,
            required: true
        },
        {
            name: 'Reactions',
            description: 'Bunch of reactions separated by ","',
            type: ParameterType.String,
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
        const [messageID, reactions, channelID = d.ctx!.channel!.id] = d.function!.compiled.parameters.map(t => t.value)
        const channel = d.ctx?.server?.channels.get(channelID)
        if (!channel) throw new Error('Invalid channel ID provided in: ' + d.function?.compiled.name)
        const message = channel.messages.get(messageID)
        if (!message) throw new Error('Invalid message ID provided in: ' + d.function?.compiled.name)
        const emojis = reactions.split(',').map(emoji => emoji.trim())
        for (const emoji of emojis) {
            await message.source.interactions?.reactions?.push(emoji)
        }
    }
})