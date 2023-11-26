import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@version',
    description: 'Returns the current LyteScript version.',
    execute: async function (d) {
        return require('../../package.json').version
    }
})