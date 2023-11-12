import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@shutdown',
    description: 'Kill the client and shutdown the process.',
    execute: async function (d) {
        await d.ctx?.bot.destroy()
        process.exit(0)
    }
})