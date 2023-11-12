import { Data, ICommand, NativeFunction, ParameterType } from '../main.js'

/**
 * Get a command property, only if the command exists.
 * @param d Interpreter data.
 * @param name Command name.
 * @param property Command property.
 */
function getCommand(d: Data, name: string, property: string, extra: string) {
    const command = d.ctx?.bot.commands.get(name) as ICommand & Record<string, string>
    if (property === 'code') return command?.code
    else if (property === 'aliases') return command?.aliases?.join(',')
    else if (property === 'type') return command?.type
    else if (property === 'unknown') {
        if (!Object.getOwnPropertyNames(command).includes(extra)) return;
        else return typeof command?.[extra] === 'object'
            ? JSON.stringify(command?.[extra])
            : typeof command?.[extra] !== 'string'
                ? command?.[extra].toString()
                : command?.[extra]
    }
}

export default new NativeFunction({
    name: '@command',
    description: 'Returns a command property.',
    parameters: [
        {
            name: 'Name',
            description: 'The command name.',
            resolver: ParameterType.String,
            required: true
        },
        {
            name: 'Property',
            description: 'The command property to get.',
            resolver: ParameterType.String,
            required: true
        },
        {
            name: 'Extra',
            description: 'The command property if unknown.',
            resolver: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [name, property, extra] = d.function!.compiled.parameters.map(t => t.value.toLowerCase())
        const valid = ['aliases', 'code', 'unknown', 'type', 'exists']
        if (!valid.includes(property.toLowerCase())) throw new Error('Invalid type provided in: ' + d.function?.compiled.name)
        return property.toLowerCase() === 'exists'
            ? d.ctx?.bot.commands.exists(name)
            : getCommand(d, name, property.toLowerCase(), extra)
    }
})