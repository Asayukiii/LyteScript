import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@replaceLast',
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
        const args = text.split(' '), reversed = [...args].reverse()
        const found = reversed.find(split => reversed.includes(split))
        const idx = args.lastIndexOf(found ?? '')
        if (idx !== -1) {
            args[idx] = args[idx]?.replace(new RegExp(`${match}`), replacer)
        }
        return args.join(' ')
    }
})