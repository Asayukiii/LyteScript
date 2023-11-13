import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@createChannel',
    description: 'Creates a server channel.',
    parameters: [
        {
            name: 'Name',
            description: 'Channel name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Description',
            description: 'Channel description.',
            type: ParameterType.String,
            required: false
        },
        {
            name: 'Type',
            description: 'Channel type between "Text" and "Voice".',
            type: ParameterType.String,
            required: false,
            default: 'Text'
        },
        {
            name: 'NSFW',
            description: 'Enable channel NSFW restrictions.',
            type: ParameterType.Boolean,
            required: false,
            default: 'false'
        }
    ],
    execute: async function (d) {
        const [name, description, type = 'Text', nsfw = 'false'] = d.function!.compiled.parameters.map(p => p.value)
        await d.ctx?.server?.channels.create({
            name, description, type, nsfw: nsfw === 'true'
        }).catch((e) => {
            throw new Error('Cannot create the channel!\n' + e)
        })
    }
})