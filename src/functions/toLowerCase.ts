import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@toLowerCase',
    description: 'Converts a string to lowercase.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to convert.',
            resolver: 'String'
        }
    ],
    execute: async function (d) {
        const [text] = d.function!.compiled.parameters.map(t => t.value)
        return text.toLowerCase()
    }
})