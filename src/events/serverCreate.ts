import { Context, Data, NativeEvent } from '../main.js'
import { Server } from 'revkit'

export default new NativeEvent({
    name: 'serverCreate',
    listen: async (client, server: Server) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'serverCreate')
        const data = new Data({
            ctx: new Context({ server }, client),
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