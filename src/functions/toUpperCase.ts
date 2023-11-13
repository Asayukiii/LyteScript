import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@toUpperCase',
    description: 'Converts a string to uppercase.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to convert.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [text] = d.function!.compiled.parameters.map(t => t.value)
        return text.toUpperCase()
    }
})