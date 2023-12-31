import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@args',
    description: 'Get the message content.',
    parameters: [
        {
            name: 'Index',
            description: 'Argument index.',
            type: ParameterType.Number,
            required: false,
            default: 'undefined'
        },
        {
            name: 'End',
            description: 'Argument end index.',
            type: ParameterType.Number,
            required: false,
            default: 'undefined'
        }
    ],
    execute: async function (d) {
        if (!d.ctx?.message) throw new Error('Invalid event.')
        const [index, end] = d.function!.compiled.parameters.map(t => t.value) as unknown as [number, number]
        if (index && end) return d.ctx.args.slice(Number(index), Number(end)).join(' ')
        else if (index) return d.ctx.args[Number(index)]
        else return d.ctx.args.join(' ')
    }
})