import { NativeFunction, ParameterType } from '../main.js'
import { Member } from 'revkit'

const properties = {
    avatar: (member: Member) => member?.generateAvatarURL(),
    name: (member: Member) => member?.user.username,
    nickname: (member: Member) => member?.nickname,
    permissions: (member: Member) => Object.keys(member?.permissions.map).filter(x => isNaN(Number(x))).join(','),
    id: (member: Member) => member?.id,
    isbot: (member: Member) => member?.user.bot,
    isbannable: (member: Member) => member?.bannable,
    iskickable: (member: Member) => member?.kickable,
    roleids: (member: Member) => member?.roles.map(x => x.id).join(','),
    rolenames: (member: Member) => member?.roles.map(x => x.name).join(',')
} as Record<string, CallableFunction>

export default new NativeFunction({
    name: '@member',
    description: 'Returns a member property.',
    parameters: [
        {
            name: 'Member ID',
            description: 'The member to get the property from.',
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
        const [memberID, property] = d.function!.compiled.parameters.map(t => t.value.toUpperCase())
        if (!Object.keys(properties).map(x => x.toUpperCase()).includes(property))
            throw new Error('Invalid user property in: ' + d.function?.compiled.name)
        const member = d.ctx?.server?.members.get(memberID) ?? d.ctx?.member
        return properties[property.toLowerCase()](member)
    }
})