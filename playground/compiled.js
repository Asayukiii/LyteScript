const { CompiledFunction } = require('../dist/structs/CompiledFunction.js')
const { Compiler } = require('../dist/core/Compiler.js')

/*
const func = new CompiledFunction
func.setName('@async')
func.appendValue('playground')
console.log(func.over)
*/

const compiled = Compiler.compile(`
Hi bro, how are you?
My name is @clientName, and I like @function[hi;test ;uwuu  ;      hello   ;@fn[mai]]
@[hi bro]
@[[]][]
`)

console.log(compiled)