import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@stringLength',
    description: 'Returns the length of the string.',
    parameters: [
        {
            name: 'Text',
            description: 'The texts to analyze.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [text] = d.function!.compiled.parameters.map(t => t.value)
        return text.length.toString()
    }
})