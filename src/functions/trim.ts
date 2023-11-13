import { NativeFunction, ParameterType } from '../main.js'

/**
 * Trim a text.
 * @param text The text to work with.
 * @param type Trim type.
 * @returns {string}
 */
function trim(text: string, type: 'all' | 'start' | 'end') {
    if (type === 'all') return text.trim()
    else if (type === 'start') return text.trimStart()
    else if (type === 'end') return text.trimEnd()
}

export default new NativeFunction({
    name: '@trim',
    description: 'Trim a text.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Type',
            description: 'Trim type between "all", "start" and "end".',
            type: ParameterType.String,
            required: false,
            default: 'all'
        }
    ],
    execute: async function (d) {
        const [text, type = 'all'] = d.function!.compiled.parameters.map(t => t.value) as unknown as [string, 'all' | 'start' | 'end']
        if (!['all', 'start', 'end'].includes(type.toLowerCase()))
            throw new Error('Invalid type provided in: ' + d.function?.compiled.name)
        return trim(text, type)
    }
})