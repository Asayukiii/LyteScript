import { Context, Data, NativeEvent } from '../main.js'
import { Emoji } from 'revkit'

export default new NativeEvent({
    name: 'emojiDelete',
    listen: async (client, id: string, emoji: Emoji) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'emojiDelete')
        const data = new Data({
            ctx: new Context({ emoji }, client),
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