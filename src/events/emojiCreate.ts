import { Context, Data, NativeEvent } from '../main.js'
import { Emoji } from 'revkit'

export default new NativeEvent({
    name: 'emojiCreate',
    listen: async (client, emoji: Emoji) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'emojiCreate')
        const data = new Data({
            client,
            ctx: new Context({
                emoji,
                user: emoji.creator === undefined ? await emoji.fetchCreator() : emoji.creator
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