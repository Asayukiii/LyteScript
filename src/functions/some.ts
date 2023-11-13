import { NativeFunction, ParameterType, Util } from '../main.js'

export default new NativeFunction({
    name: '@some',
    description: 'Return some of the provided values.',
    parameters: [
        {
            name: 'Values',
            description: 'Values to return.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const values = d.function!.compiled.parameters.map(t => Util.parse(t.value))
        return values.filter(x => !!x && x !== undefined)?.toString() ?? 'null'
    }
})