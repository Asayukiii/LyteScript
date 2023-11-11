/**
 * Character escapers to avoid bugs.
 */
const escapers = [
    ['#COLON#', ':'],
    ['#SEMI#', ';'],
    ['#DOL#', '$'],
    ['#LEFT#', '['],
    ['#RIGHT#', ']']
]

interface String {
    escape: () => String
    unescape: () => String
}

String.prototype.escape = function() {
    let text = this
    for (const escaper of escapers)
        text = text.replace(new RegExp(`${escaper[1]}`, 'ig'), escaper[0])
    return text
}

String.prototype.unescape = function() {
    let text = this
    for (const escaper of escapers)
        text = text.replace(new RegExp(`${escaper[0]}`, 'ig'), escaper[1])
    return text
}