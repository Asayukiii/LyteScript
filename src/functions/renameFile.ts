import { NativeFunction, ParameterType } from '../main.js'
import { renameSync } from 'fs'

export default new NativeFunction({
    name: '@renameFile',
    description: 'Rename a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'File path.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Separator',
            description: 'File separator.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        const [old, newer] = d.function!.compiled.parameters.map(p => p.value)
        return renameSync(old, newer)
    }
})