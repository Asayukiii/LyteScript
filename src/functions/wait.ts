import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@wait',
    description: 'Holds code execution for the provided time.',
    parameters: [
        {
            name: 'Time',
            description: 'Time to hold code execution.',
            type: ParameterType.Time,
            required: true
        }
    ],
    execute: async function (d) {
        const [time] = d.function!.compiled.parameters.map(t => t.value)
        const parsed = d.time.parse(time)
        if (!parsed) throw new Error('Invalid time provided in: ' + d.function?.compiled.name)
        await new Promise(res => setTimeout(res, parsed))
    }
})