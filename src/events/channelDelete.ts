import { Context, Data, NativeEvent } from '../main.js'
import { Channel } from 'revkit'

export default new NativeEvent({
    name: 'channelDelete',
    listen: async (client, id: string, channel: Channel) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'channelDelete')
        const data = new Data({
            client,
            ctx: new Context({
                channel,
                server: channel.isServerBased() ? channel.server : undefined
            }, client),
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