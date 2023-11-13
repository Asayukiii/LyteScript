import { Context, Data, NativeEvent } from '../main.js'
import { BaseMessage } from 'revkit'

export default new NativeEvent({
    name: 'messageUpdate',
    listen: async (client, message: BaseMessage) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'messageUpdate')
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