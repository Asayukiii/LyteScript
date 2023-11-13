import { Context, Data, NativeEvent } from '../main.js'
import { BaseMessage } from 'revkit'

export default new NativeEvent({
    name: 'messageDelete',
    listen: async (client, id: string, message: BaseMessage) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'messageDelete')
        const data = new Data({
            ctx: new Context({ message }, client),
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