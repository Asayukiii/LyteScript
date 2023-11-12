import { NativeFunction, ParameterType } from '../main.js'
import { readFileSync } from 'fs'

export default new NativeFunction({
    name: '@readFile',
    description: 'Read a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'File path.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [dir] = d.function!.compiled.parameters.map(p => p.value)
        return readFileSync(dir, { encoding: 'utf-8' })
    }
})