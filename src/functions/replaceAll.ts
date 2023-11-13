import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@replaceAll',
    description: 'Replaces all matches in a string.',
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
        },
        {
            name: 'Replacement',
            description: 'The replacement.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [text, match, replacer] = d.function!.compiled.parameters.map(t => t.value)
        return text.replace(new RegExp(`${match}`, 'g'), replacer)
    }
})