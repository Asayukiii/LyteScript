import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@removeRole',
    description: 'Remove a role from a member.',
    parameters: [
        {
            name: 'Role ID',
            description: 'The role ID to remove.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Member ID',
            description: 'The member ID to remove the role from.',
            type: ParameterType.String,
            required: false,
            default: 'd.ctx?.member?.id'
        }
    ],
    execute: async function (d) {
        const [roleID, memberID = d.ctx!.member!.id] = d.function!.compiled.parameters.map(p => p.value)
        const member = d.ctx?.server?.members.get(memberID)
        if (!member) throw new Error('Invalid member ID provided in: ' + d.function?.compiled.name)
        const role = d.ctx?.server?.roles.get(roleID)
        if (!role) throw new Error('Invalid role ID provided in: ' + d.function?.compiled.name)
        await member.removeRole(role).catch((err) => {
            throw new Error('Cannot remove the role!\n' + err)
        })
    }
})