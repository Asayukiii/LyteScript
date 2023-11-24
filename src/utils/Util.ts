import { parse } from 'hjson'

export class Util {
    /**
     * Check if the provided text is BigInt-parseable.
     * @param text text to test.
     * @returns {boolean}
     */
    static isBigInt(text: string) {
        return text.match(/^-?\d+n$/) !== null
    }

    /**
     * Check if the string json is parseable.
     * @param text String JSON.
     * @returns {boolean}
     */
    static isJSONParseable(text: string) {
        if (!text.startsWith('{') && !text.endsWith('}'))
            return false
        try {
            parse(text)
            return true
        } catch {
            return false
        }
    }

    /**
     * Parses the string to it's native data type.
     * @param text The data to parse.
     */
    static parse(text: string): string | number | BigInt | Object | null | undefined {
        if (text === '') return text
        else if (text === 'undefined') return undefined
        else if (text === 'null') return null
        else if (text === 'true' || text === 'false') return text === 'true'
        else if (!isNaN(Number(text)) && Number.isSafeInteger(Number(text)))
            return Number(text)
        else if (
            (!isNaN(Number(text)) && !Number.isSafeInteger(text)) ||
            Util.isBigInt(text)
        ) return BigInt(text.replace('n', ''))
        else {
            try {
                return JSON.parse(text)
            } catch {
                return text
            }
        }
    }

    /**
     * Shuffles an array.
     * @param array Array to be affected.
     * @returns {any[]}
     */
    static arrayShuffle(array: any[]): any[] {
        let cloned = [...array]
        for (let i = 0; i < array.length; i--) {
            const random = Math.floor(Math.random() * (cloned.length + 1)) as number
            [cloned[i], cloned[random]] = [cloned[random], cloned[i]]
        }
        return cloned
    }
}