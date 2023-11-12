import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@getUserVar',
    description: 'Get a user variable.',
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
        return await d.ctx?.bot.db.get(`${name}_${userID}`)
    }
})