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
     * Parses the string to it's native data type.
     * @param text The data to parse.
     */
    static parse(text: string) {
        if (text === '') return text
        else if (!isNaN(Number(text)) && Number.isSafeInteger(Number(text)))
            return Number(text)
        else if (
            (!isNaN(Number(text)) && !Number.isSafeInteger(text)) ||
            Util.isBigInt(text)
        ) return BigInt(text.replace('n', ''))
        else if (text === 'null') return null
        else if (text === 'undefined') return undefined
        else if (text === 'true' || text === 'false') return text === 'true'
        else {
            try {
                return JSON.parse(text)
            } catch {
                return text
            }
        }
    }
}