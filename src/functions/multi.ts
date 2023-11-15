import { NativeFunction, ParameterType, Util } from '../main.js'

export default new NativeFunction({
    name: '@multi',
    description: 'Returns the multiplication between numbers.',
    parameters: [
        {
            name: 'Numbers',
            description: 'Numbers to multiply.',
            type: ParameterType.Number,
            required: true
        }
    ],
    execute: async function (d) {
        const numbers = d.function!.compiled.parameters.map(t => Util.parse(t.value)) as number[]
        return numbers.reduce((a, b) => a * b)
    }
})