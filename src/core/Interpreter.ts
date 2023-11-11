import { Compiler, Data, NativeFunction, Util, unescape } from '../main.js'

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

        for (let idx = 0; idx < compiled.functions.length; idx++) {
            const fn = compiled.functions[idx]
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
                    const dontParse = (spec && 'parse' in spec && spec.parse === false) ?? false
                    const dontUnescape = (spec && 'unescape' in spec && spec.unescape === false) ?? false
                    const parsedParam: string = dontParse ? param.value : (await this.evaluate(param.value, subdata)).code
                    const resolved = Util.parse(parsedParam)
                    if (spec?.resolver === 'Boolean' && ![true, false].includes(resolved)) {
                        throw new Error('Invalid type provided, expected "Boolean", provided ' + typeof resolved)
                    } else if (spec?.resolver === 'Object' && typeof resolved !== 'object') {
                        throw new Error('Invalid type provided, expected "JSON", provided ' + typeof resolved)
                    } else if (spec?.resolver === 'Number' && isNaN(resolved)) {
                        throw new Error('Invalid type provided, expected "Number", provided ' + typeof resolved)
                    }
                    params.push(dontUnescape ? resolved : Util.parse(unescape(parsedParam)))
                    fn.parameters[i].overwrite(dontUnescape ? resolved : Util.parse(unescape(parsedParam)))
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