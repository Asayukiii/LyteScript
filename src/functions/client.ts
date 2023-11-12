import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@client',
    description: 'Return a client property.',
    parameters: [
        {
            name: 'Property',
            description: 'Property name to get.',
            resolver: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [property] = d.function!.compiled.parameters.map(t => t.value.toLowerCase())
        const properties = ['username', 'id', 'avatar', 'discriminator']
        if (!properties.includes(property)) throw new Error('Invalid property provided.\nExpected some of "' + properties.join(', ') + '", provided "' + property + '"')
        // @ts-ignore
        return d.ctx?.bot.user[property]
    }
})