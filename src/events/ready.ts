import { Context, Data, NativeEvent } from '../main.js'

export default new NativeEvent({
    name: 'ready',
    listen: async (client) => {
        await new Promise(res => setTimeout(res, 2000))
        const commands = Object.values(client.commands._data).filter(command => command.type === 'ready')
        const data = new Data({
            ctx: new Context(null, client),
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