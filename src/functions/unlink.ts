import { NativeFunction, ParameterType } from '../main.js'
import { unlinkSync } from 'fs'

export default new NativeFunction({
    name: '@unlink',
    description: 'Delete a file.',
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
        return unlinkSync(dir)
    }
})