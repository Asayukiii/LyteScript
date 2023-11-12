import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@log',
    description: 'Logs something in console.',
    parameters: [
        {
            name: 'Texts',
            description: 'The texts to log.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [...texts] = d.function!.compiled.parameters.map(t => t.value)
        console.log(...texts)
    }
})