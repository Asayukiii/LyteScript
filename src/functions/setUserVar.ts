import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@setUserVar',
    description: 'Set a user variable.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            resolver: 'String'
        },
        {
            name: 'Value',
            description: 'Variable value.',
            resolver: 'String'
        },
        {
            name: 'ID',
            description: 'User ID.',
            resolver: 'String'
        }
    ],
    execute: async function (d) {
        const [name, value, userID = d.ctx?.user?.id] = d.function!.compiled.parameters.map(t => t.value)
        await d.ctx?.bot.db.set(`${name}_${userID}`, value)
    }
})