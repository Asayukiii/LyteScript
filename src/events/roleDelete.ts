import { Context, Data, NativeEvent } from '../main.js'
import { Role } from 'revkit'

export default new NativeEvent({
    name: 'serverRoleDelete',
    listen: async (client, role: Role) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'serverRoleDelete')
        const data = new Data({
            ctx: new Context({ role }, client),
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