import { NativeFunction, ParameterType } from '../main.js'

export default new NativeFunction({
    name: '@wait',
    description: 'Holds code execution for the provided time.',
    parameters: [
        {
            name: 'Time',
            description: 'Time to hold code execution.',
            resolver: ParameterType.Time,
            required: true
        }
    ],
    execute: async function (d) {
        const [time] = d.function!.compiled.parameters.map(t => t.value) as unknown as [number]
        await new Promise(res => setTimeout(res, time))
    }
})