import { Context, Data, NativeEvent } from '../main.js'
import { Channel, User } from 'revkit'

export default new NativeEvent({
    name: 'channelStartTyping',
    listen: async (client, user: User, channel: Channel) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'channelStartTyping')
        const ctx = new Context({ channel, user }, client)
        const data = new Data({
            ctx,
            functions: client.functions,
            interpreter: client.interpreter,
            cache: {}
        })
        for (const command of commands) {
            await client.interpreter.evaluate(
                command.code,
                data
            )
        }
    }
})