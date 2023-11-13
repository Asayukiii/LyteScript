import { Context, Data, NativeEvent } from '../main.js'
import { Channel } from 'revkit'

export default new NativeEvent({
    name: 'channelUpdate',
    listen: async (client, channel: Channel) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'channelUpdate')
        const data = new Data({
            ctx: new Context({ channel }, client),
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