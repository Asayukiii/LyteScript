import { EmbedBuilder, Embed } from 'revkit'
import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@sendMessage',
    description: 'Sends a message to the provided channel.',
    parameters: [
        {
            name: 'Code',
            description: 'JavaScript code to be evaled.',
            type: ParameterType.String,
            compile: false,
            required: true
        },
        {
            name: 'return ID',
            description: 'Switch wether return the message ID or not.',
            type: ParameterType.Boolean,
            required: false,
            default: 'false'
        }
    ],
    execute: async function (d) {
        const [code, backID = false] = d.function!.compiled.parameters.map(t => t.value)
        const data = d.extend({...d})
        let payload = {
            content: '',
            embeds: [] as any[]
        }
        data.functions?.add('@setContent', {
            async execute(t) {
                const [content] = t.function!.compiled.parameters.map(x => x.value)
                payload.content += content
            }
        })
        .add('@appendEmbed', {
            parameters: [{
                name: 'Builders',
                description: 'Embed builders.',
                compile: false,
                required: true
            }],
            async execute(t) {
                const [builders] = t.function!.compiled.parameters.map(x => x.value)
                const embed = new EmbedBuilder
                const subdata = data.extend({...data})
                subdata.functions?.add('@setTitle', {
                    async execute(x) {
                        const [title] = x.function!.compiled.parameters.map(x => x.value)
                        embed.setTitle(title)
                    }
                })
                .add('@setDescription', {
                    async execute(x) {
                        const [description] = x.function!.compiled.parameters.map(x => x.value)
                        embed.setDescription(description)
                    }
                })
                .add('@setIconURL', {
                    async execute(x) {
                        const [icon] = x.function!.compiled.parameters.map(x => x.value)
                        embed.setIconURL(icon)
                    }
                })
                await subdata.interpreter.evaluate(builders, subdata)
                payload.embeds.push(embed)
            }
        })
        await data.interpreter.evaluate(code, data)
        const message = await d.ctx?.send(payload)
        if (backID && message?.id) return message.id
    }
})