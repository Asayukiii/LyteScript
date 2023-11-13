import { Context, Data, NativeEvent } from '../main.js'
import { Member } from 'revkit'

export default new NativeEvent({
    name: 'serverMemberJoin',
    listen: async (client, member: Member) => {
        const commands = Object.values(client.commands._data).filter(command => command.type === 'serverMemberJoin')
        const data = new Data({
            client,
            ctx: new Context({
                member,
                server: member.server,
                user: member.user
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