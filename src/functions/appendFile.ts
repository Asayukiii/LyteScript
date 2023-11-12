import { NativeFunction, ParameterType } from '../main.js'
import { appendFileSync } from 'fs'

export default new NativeFunction({
    name: '@appendFile',
    description: 'Appends content to a file.',
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
        return appendFileSync(dir, content, { encoding: 'utf-8' })
    }
})