import { NativeFunction, ParameterType, Util } from '../main.js'
import { request } from 'undici'

export default new NativeFunction({
    name: '@httpGet',
    description: 'Sends a HTTP get request.',
    parameters: [
        {
            name: 'URL',
            description: 'The URL to send the request to.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [url] = d.function!.compiled.parameters.map(t => t.value)
        const result = await request(url, {
            method: 'GET'
        })
        const json = await result.body.json() as any
        return Util.isJSONParseable(json) ? JSON.stringify(json ?? {}) : '{}'
    }
})