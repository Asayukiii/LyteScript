import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@argCount',
    description: 'Returns the length of message arguments.',
    execute: async (d) => d.ctx?.args.length.toString()
})