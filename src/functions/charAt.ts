import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@charAt',
    description: 'Returns the character at the provided string index.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Index',
            description: 'Character index.',
            type: ParameterType.Number,
            required: true
        }
    ],
    execute: async function (d) {
        const [text, idx] = d.function!.compiled.parameters.map(t => t.value)
        return text.charAt(Number(idx))
    }
})