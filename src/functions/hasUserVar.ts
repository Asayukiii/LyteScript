import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@hasUserVar',
    description: 'Check if the user variable exists.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            resolver: 'String'
        },
        {
            name: 'ID',
            description: 'User ID.',
            resolver: 'String'
        }
    ],
    execute: async function (d) {
        const [name, userID = d.ctx?.user?.id] = d.function!.compiled.parameters.map(t => t.value)
        return await d.ctx?.bot.db.has(`${name}_${userID}`)
    }
})