import { NativeFunction, ParameterType, Util } from '../main.js'

export default new NativeFunction({
    name: '@multi',
    description: 'Returns the multiplication of two numbers.',
    parameters: [
        {
            name: 'Number 1',
            description: 'Number 1 to multiply.',
            type: ParameterType.Number,
            required: true
        },
        {
            name: 'Number 2',
            description: 'Number 2 to multiply.',
            type: ParameterType.Number,
            required: true
        },
    ],
    execute: async function (d) {
        const [n1, n2] = d.function!.compiled.parameters.map(t => Util.parse(t.value))
        return Number(n1) * Number(n2)
    }
})