import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@hasPerm',
    description: 'Check if the member has the provided permissions.',
    parameters: [
        {
            name: 'Member ID',
            description: 'The member ID to check.',
            type: ParameterType.Member,
            required: true
        },
        {
            name: 'Permissions',
            description: 'Permission names to check.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [memberID, ...permissions] = d.function!.compiled.parameters.map(t => t.value)
        const member = d.ctx?.server?.members.get(memberID)
        if (!member) throw new Error('Invalid member ID provided in:' + d.function?.compiled.name)
        const perms = Object.keys(d.ctx!.channel!.permissionsFor(member).map).filter(x => isNaN(Number(x)))
        return perms.every(perm => permissions.includes(perm))
    }
})