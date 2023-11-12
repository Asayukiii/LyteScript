import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@stop',
    description: 'Stops the execution for the left code.',
    execute: async function (d) {
        d.break = true
    }
})