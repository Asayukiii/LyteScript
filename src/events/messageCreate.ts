import { Context, Data, NativeEvent } from '../main.js'
import { Message } from 'revkit'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default new NativeEvent({
    name: 'message',
    listen: async (client, message: Message) => {
        if (message.author.bot) return
        const unprefixed = Object.values(client.commands._data).filter(command => command.type === 'message' && !command.name)
        const context = new Context({
            channel: message.channel,
            member: message.member,
            message,
            server: message.server,
            user: message.author,
        }, client)
        const data = new Data({
            client,
            cache: {}, ctx: context,
            functions: client.functions,
            interpreter: client.interpreter
        })
        for (const command of unprefixed) {
            await client.interpreter.evaluate(command.code, data)
        }

        const prefixed = Object.values(client.commands._data).filter(command => command.type === 'message' && command.name)
        let prefixes = typeof client.extraOptions.prefixes === 'string' ? [client.extraOptions.prefixes] : client.extraOptions.prefixes
        for (let i = 0; i < prefixes.length; i++) {
            const pr = prefixes[i],
            result = await client.interpreter.evaluate(pr, data)
            prefixes[i] = result.code
        }
        let prefix = prefixes.find(pr => message.content.toLowerCase().startsWith(pr.toLowerCase()))
        if (!prefix) return
        const args = message.content.slice(prefix.length).trim().split(' ')
        const commandName = args.shift()?.toLowerCase()!
        context.setArgs(args)
        const command = prefixed.find(command => command.name === commandName || (command.aliases && command.aliases.includes(commandName)))
        if (command) await client.interpreter.evaluate(command.code, data)
    }
})