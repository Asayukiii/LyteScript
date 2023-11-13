import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@repeat',
    description: 'Repeat a text multiple times.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Times',
            description: 'How many times the string will be repeated.',
            type: ParameterType.Number,
            required: true
        }
    ],
    execute: async function (d) {
        const [text,index] = d.function!.compiled.parameters.map(t => t.value)
        return text.repeat(Number(index))
    }
})