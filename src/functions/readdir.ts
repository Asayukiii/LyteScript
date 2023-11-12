import { NativeFunction, ParameterType } from '../main.js'
import { readdirSync } from 'fs'

export default new NativeFunction({
    name: '@readdir',
    description: 'Reads a directory and joins the file list.',
    parameters: [
        {
            name: 'Directory',
            description: 'Directory path.',
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
        const [dir, sep = ','] = d.function!.compiled.parameters.map(p => p.value)
        return readdirSync(dir, { withFileTypes: true }).join(sep)
    }
})