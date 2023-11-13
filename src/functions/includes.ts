import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@includes',
    description: 'Check whether string includes the provided match.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Match',
            description: 'The thing to match in the string.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [text, match] = d.function!.compiled.parameters.map(t => t.value)
        return text.includes(match)
    }
})