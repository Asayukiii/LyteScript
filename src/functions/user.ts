import { NativeFunction, ParameterType } from '../main.js'
import { User } from 'revkit'

const properties = {
    avatar: (author: User) => author?.avatar,
    discriminator: (author: User) => author?.discriminator,
    displayname: (author: User) => author?.displayName,
    name: (author: User) => author?.username,
    id: (author: User) => author?.id,
    isbot: (author: User) => author?.bot
} as Record<string, CallableFunction>

export default new NativeFunction({
    name: '@user',
    description: 'Returns a user property.',
    parameters: [
        {
            name: 'User ID',
            description: 'The user to get the property from.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Property',
            description: 'Property name to get.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [userID, property] = d.function!.compiled.parameters.map(t => t.value.toUpperCase())
        if (!Object.keys(properties).map(x => x.toUpperCase()).includes(property))
            throw new Error('Invalid user property in: ' + d.function?.compiled.name)
        const user = d.ctx?.bot.users.get(userID) ?? d.ctx?.user
        return properties[property.toLowerCase()](user)
    }
})