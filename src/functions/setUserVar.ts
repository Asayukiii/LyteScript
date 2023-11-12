import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@setUserVar',
    description: 'Set a user variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Value',
            description: 'Variable value.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'ID',
            description: 'User ID.',
            type: ParameterType.String,
            required: false,
            default: 'd.ctx?.user?.id'
        }
    ],
    execute: async function (d) {
        const [name, value, userID = d.ctx?.user?.id] = d.function!.compiled.parameters.map(t => t.value)
        await d.ctx?.bot.db.set(`${name}_${userID}`, value)
    }
})