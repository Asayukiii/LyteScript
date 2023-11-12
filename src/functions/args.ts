import { NativeFunction } from '../main.js'

export default new NativeFunction({
    name: '@args',
    description: 'Get the message content.',
    parameters: [
        {
            name: 'Index',
            description: 'Argument index.',
            resolver: 'Number'
        },
        {
            name: 'End',
            description: 'Argument end index.',
            resolver: 'Number'
        }
    ],
    execute: async function (d) {
        if (!d.ctx?.message) throw new Error('Invalid event.')
        const [index = -1, end = d.ctx?.args.length] = d.function!.compiled.parameters.map(t => t.value) as unknown as [number, number]
        let args = end ? d.ctx.args.slice(index, end) : d.ctx.args[index]
        if (index === -1) return d.ctx.args.join(' ')
        else return args
    }
})