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
        text = text.replace(escaper[1], escaper[0])
    return text
}

String.prototype.unescape = function() {
    let text = this
    for (const escaper of escapers)
        text = text.replace(escaper[0], escaper[1])
    return text
}