import { NativeFunction, ParameterType } from '../main.js'
import { writeFileSync } from 'fs'

export default new NativeFunction({
    name: '@writeFile',
    description: 'Write content in a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'File path.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Content',
            description: 'File content.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [dir, content] = d.function!.compiled.parameters.map(p => p.value)
        return writeFileSync(dir, content)
    }
})