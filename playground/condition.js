const { Condition } = require('../dist/core/Condition.js')
const x = require('../dist/main')

const condition = new Condition
const res = condition.resolve('1 > 0 && 5 < 10 && (12 > 6 || 13 < 1)')