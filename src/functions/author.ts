import { NativeFunction, ParameterType } from '../main.js'
import { User } from 'revkit'

export default new NativeFunction({
    name: '@author',
    description: 'Returns an author property.',
    parameters: [
        {
            name: 'Property',
            description: 'Property name to get.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [property] = d.function!.compiled.parameters.map(t => t.value.toLowerCase())
        const properties = {
            avatar: (author: User) => author.avatar,
            discriminator: (author: User) => author.discriminator,
            displayname: (author: User) => author.displayName,
            name: (author: User) => author.username,
            id: (author: User) => author.id,
            isbot: (author: User) => author.bot
        } as Record<string, CallableFunction>
        if (!Object.keys(properties).includes(property.toLowerCase()))
            throw new Error('Invalid user property in: ' + d.function?.compiled.name)
        return properties[property.toLowerCase()](d.ctx?.user)
    }
})