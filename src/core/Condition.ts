/**
 * Represents a new condition parser.
 */
export class Condition {
    /**
     * Resolve a condition.
     * @param text String based condition.
     * @returns {boolean}
     */
    resolve(text: string) {
        const results: boolean[] = []
        const ands = text.split('&&').map(condition => condition.replace(/(\(|\))/g, '').trim())
        for (const and of ands) {
            const subs: boolean[] = []
            const ors = and.split('||').map(condition => condition.trim())
            for (const or of ors) {
                let kind = 'left', data = ['', '', '']
                for (let i = 0; i < or.length; i++) {
                    const char = or[i], next = or[i + 1]
                    if (this.operators.includes(char) && kind === 'left') {
                        kind = 'operator'
                    }

                    if (kind === 'left') data[0] += char
                    else if (kind === 'operator') data[1] += char
                    else if (kind === 'right') data[2] += char

                    if (this.operators.includes(next) && kind === 'left') {
                        kind = 'operator'
                    } else if (!this.operators.includes(next) && kind === 'operator') {
                        kind = 'right'
                    }
                }
                data = data.map(text => text.trim())
                if (data[1] === '') data[1] = '==', data[2] = data[0]

                const [left, operator, right] = data
                if (!this.isValidSymbol(operator))
                    throw new Error('Invalid operator, expected some of "' + this.symbols.join(', ') + '".\nProvided "' + operator + '"')

                switch (operator) {
                case '<': {
                    subs[subs.length] = Number(left) < Number(right)
                    break
                }
                case '>': {
                    subs[subs.length] = Number(left) > Number(right)
                    break
                }
                case '<=': {
                    subs[subs.length] = Number(left) <= Number(right)
                    break
                }
                case '>=': {
                    subs[subs.length] = Number(left) >= Number(right)
                    break
                }
                case '!=': {
                    subs[subs.length] = left != right
                    break
                }
                case '==': {
                    subs[subs.length] = left == right
                    break
                }
                }
            }
            results.push(subs.some(result => result === true))
        }
        return results.every(result => result === true)
    }

    /**
     * Checks if the provided condition operator is valid.
     * @param symbol Condition operator.
     * @returns {boolean}
     */
    isValidSymbol(symbol: string) {
        return [
            '<',
            '>',
            '==',
            '!=',
            '>=',
            '<='
        ].includes(symbol.trim())
    }

    /**
     * Return all supported condition operators.
     */
    get operators() {
        return [
            '>',
            '<',
            '!',
            '='
        ]
    }

    /**
     * Return all supported condition symbols.
     */
    get symbols() {
        return [
            '<',
            '>',
            '==',
            '!=',
            '>=',
            '<='
        ]
    }
}