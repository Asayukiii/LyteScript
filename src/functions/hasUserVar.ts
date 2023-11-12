import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@hasUserVar',
    description: 'Check if the user variable exists.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
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
        const [name, userID = d.ctx?.user?.id] = d.function!.compiled.parameters.map(t => t.value)
        return await d.ctx?.bot.db.has(`${name}_${userID}`)
    }
})