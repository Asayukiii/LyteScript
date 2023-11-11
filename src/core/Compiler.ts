import { CompiledFunction } from '../structs/CompiledFunction.js'
import { CompiledText } from '../structs/CompiledText.js'

/**
 * Check if the provided parameter is text.
 * @param text The text to test.
 * @returns {boolean}
 */
const isText = (text: string) => /\w/.test(text)

/**
 * Represents a new compiler.
 */
export class Compiler {
    /**
     * Compiles NiteScript tokens into manipulable tokens.
     * @param code NiteScript code to compile.
     */
    static compile(code: string) {
        let func = new CompiledFunction, text = new CompiledText
        const functions: CompiledFunction[] = [], texts: CompiledText[] = []
        let depth = 0, type = 'text'

        for (let i = 0; i < code.length; i++) {
            const char = code[i], next = code[i + 1]

            if ('[' === char) depth++
            else if (']' === char) depth--

            if ('text' === type) {
                if ('@' === char && isText(next)) {
                    type = 'function name'
                    func.name += '@'
                    if (text.value !== '') 
                        texts.push(text),
                        text = new CompiledText
                } else text.write(char)
            } else if (type.startsWith('function')) {
                const kind = type.split(' ')[1].trim()
                if ('name' === kind) {
                    if ('[' === char) {
                        func.setName(func.name)
                        type = 'function parameter'
                    } else if (!isText(char)) {
                        const fake = new CompiledText
                        fake.set('{CALL_FN_' + functions.length + '}')
                        text.write(char), func.setName(func.name),
                        functions.push(func), texts.push(fake)
                        func = new CompiledFunction, type = 'text'
                    } else func.name += char
                } else if ('parameter' === kind) {
                    if (depth === 0 && char === ']') {
                        if (text.value !== '') 
                            func.appendValue(text.value),
                            text = new CompiledText
                        const fake = new CompiledText
                        fake.set('{CALL_FN_' + functions.length + '}')
                        func.setName(func.name), functions.push(func), texts.push(fake)
                        func = new CompiledFunction, type = 'text'
                    } else if (depth <= 1 && char === ';') {
                        func.appendValue(text.value)
                        text = new CompiledText
                    } else text.write(char)
                }
            }
        }

        if (text.value !== '')
            texts.push(text)
        if (func.name !== '')
            functions.push(func)

        return { functions, texts }
    }
}