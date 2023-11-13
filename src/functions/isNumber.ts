import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@isNumber',
    description: 'Check if the given text is number.',
    parameters: [
        {
            name: 'Text',
            description: 'The texts to test.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [text] = d.function!.compiled.parameters.map(t => t.value)
        return !isNaN(Number(text)) && Number.isSafeInteger(text)
    }
})