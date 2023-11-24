import { NativeFunction, ParameterType, Util } from '../main.js'
import { request } from 'undici'

export default new NativeFunction({
    name: '@httpPost',
    description: 'Sends a HTTP post request.',
    parameters: [
        {
            name: 'URL',
            description: 'The URL to send the request to.',
            type: ParameterType.String,
            required: true
        },
        {
            name: 'Body',
            description: 'The body for this request.',
            type: ParameterType.Object,
            required: false
        },
        {
            name: 'Headers',
            description: 'Headers for this request.',
            type: ParameterType.String,
            required: false
        }
    ],
    execute: async function (d) {
        let [url, body = '{}', ...headers] = d.function!.compiled.parameters.map(t => t.value)
        let requestConfig: Record<string, any> = {
            method: 'POST',
            body: {},
            headers: {}
        }
        if (!Util.isJSONParseable(body)) throw new Error('Invalid body object provided in: ' + d.function?.compiled.name)
        const parsedBody = JSON.parse(body)
        for (const x in parsedBody) {
            Object.defineProperty(requestConfig.body, x, {
                value: parsedBody[x]
            })
        }
        for (const header of headers) {
            const [name, value] = header.split(':')
            requestConfig.headers[name] = value
        }
        const result = await request(url, requestConfig)
        const json = await result.body.json() as any
        return Util.isJSONParseable(json) ? JSON.stringify(json ?? {}) : '{}'
    }
})