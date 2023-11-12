import { NativeFunction, ParameterType } from '../main.js'
import { mkdirSync } from 'fs'

export default new NativeFunction({
    name: '@mkdir',
    description: 'Makes a directory.',
    parameters: [
        {
            name: 'Directory',
            description: 'Directory path.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [dir] = d.function!.compiled.parameters.map(p => p.value)
        return mkdirSync(dir)
    }
})