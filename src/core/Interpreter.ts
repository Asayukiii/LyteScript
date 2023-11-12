import { Channel } from 'revkit'
import { Compiler, Data, NativeFunction, ParameterType, Util, unescape } from '../main.js'

export class Interpreter {
    /**
     * Evaluate NiteScript code.
     * @param code Code to execute.
     * @param data Base data.
     * @returns {Data}
     */
    async evaluate(code: string, data: Data): Promise<Data> {
        const compiled = Compiler.compile(code)
        data.start = Date.now(), data.compiled = compiled
        const results = compiled.texts.map(text => text.value), parsed: string[] = []

        for (let idx = 0; idx < compiled.calls.length; idx++) {
            const fn = compiled.calls[idx]
            if (data.break) break
            if (!data.functions?.exists(fn.name)) {
                if (fn.parameters.length > 0) {
                    const inside = fn.parameters.map(param => param.value).join(';')
                    const parsedInside = await this.evaluate(inside, data)
                    parsed.push(fn.over.replace(inside, parsedInside.code))
                } else parsed.push(fn.over)
                continue
            }

            const params: string[] = [], func = data.functions.get(fn.name) as NativeFunction
            data.function = { compiled: fn, spec: func }
            if (fn.parameters.length > 0) {
                for (let i = 0; i < fn.parameters.length; i++) {
                    const subdata = data.extend({ ...data })
                    const param = fn.parameters?.[i], spec = func.parameters?.[i]
                    if (!param && spec?.required) throw new Error('Missing required function parameter in: ' + data.function.compiled.name)
                    const dontParse = (spec && 'compile' in spec && spec.compile === false) ?? false
                    const dontUnescape = (spec && 'unescape' in spec && spec.unescape === false) ?? false
                    const parsedParam: string = dontParse ? param.value : (await this.evaluate(param.value, subdata)).code
                    // Unescaping process.
                    let resolved = dontUnescape ? parsedParam : unescape(parsedParam)
                    // Parameter overwrite.
                    params.push(resolved), fn.parameters[i].overwrite(resolved)
                }
            }
            const result = await func.execute(data)
            parsed[parsed.length] = result === undefined ? '' : result
        }

        parsed.forEach((text, i) => {
            results[results.indexOf('{CALL_FN_' + i + '}')] = text
        })

        data.code = results.map(text => unescape(text)).join('')

        return data
    }
}