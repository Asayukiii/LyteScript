import { Context, FunctionManager, Interpreter, NativeFunction } from '../main.js'
import { CompiledFunction } from './CompiledFunction.js'
import { CompiledText } from './CompiledText'
import { MessagePayload } from 'revkit'

/**
 * Data inherit options.
 */
type DataOptions = {
    compiled?: {
        functions: CompiledFunction[],
        texts: CompiledText[]
    }
    interpreter: Interpreter
    break?: boolean
    code?: string
    functions?: FunctionManager
    ctx?: Context
    function?: {
        compiled: CompiledFunction,
        spec: NativeFunction
    }
    start?: number
    container?: MessagePayload
    cache: Record<string, any>
}

export class Data {
    compiled?: {
        functions: CompiledFunction[],
        texts: CompiledText[]
    }
    interpreter: Interpreter
    break?: boolean
    code: string
    functions?: FunctionManager
    ctx?: Context
    function?: {
        compiled: CompiledFunction,
        spec: NativeFunction
    }
    start?: number
    container?: MessagePayload
    cache: Record<string, any>
    constructor(data: DataOptions) {
        this.break = data?.break ?? false
        this.cache = data?.cache ?? {}
        this.code = data?.code ?? ''
        this.compiled = data?.compiled ?? {
            functions: [],
            texts: []
        }
        this.container = data?.container ?? {
            content: '',
            embeds: [],
            attachments: [],
            replies: []
        }
        this.ctx = data?.ctx
        this.function = data?.function
        this.functions = data?.functions ?? new FunctionManager
        this.interpreter = data?.interpreter ?? new Interpreter
        this.start = data?.start ?? Date.now()
    }

    /**
     * Generates a child data.
     * @param data Data options to be inherited.
     * @returns {Data}
     */
    extend(data: DataOptions) {
        return new Data({ ...data })
    }
}