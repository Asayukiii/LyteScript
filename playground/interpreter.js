const { Data, FunctionManager, Interpreter } = require('../dist/main.js')

const functions = new FunctionManager
functions.add('log', {
    async execute(d) {
        const [...texts] = d.function.compiled.parameters.map(t => t.value)
        console.log(...texts)
    }
})
.add('lower', {
    async execute(d) {
        const [inside] = d.function.compiled.parameters.map(t => t.value)
        return inside.toLowerCase()
    }
})
.add('sum', {
    parameters: [{
        name: 'N1',
        resolver: 'Number'
    },{
        name: 'N2',
        resolver: 'Number'
    }],
    async execute(d) {
        const [n1, n2] = d.function.compiled.parameters.map(t => t.value)
        return n1 + n2
    }
})
const data = new Data({
    functions
});
(new Interpreter).evaluate('@log[jola]', data);
console.log(require('crypto').randomUUID())