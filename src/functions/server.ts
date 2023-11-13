import { NativeFunction, ParameterType } from '../main.js'
import { Server } from 'revkit'

export default new NativeFunction({
    name: '@server',
    description: 'Returns a server property.',
    parameters: [
        {
            name: 'Property',
            description: 'Property name to get.',
            type: ParameterType.String,
            required: true
        }
    ],
    execute: async function (d) {
        const [property] = d.function!.compiled.parameters.map(t => t.value.toLowerCase())
        const properties = {
            icon: (server: Server) => server.generateIconURL(),
            name: (server: Server) => server.name,
            banner: (server: Server) => server.generateBannerURL(),
            ownerid: (server: Server) => server.ownerID,
            createdat: (server: Server) => server.createdAt.toString()
        } as Record<string, CallableFunction>
        if (!Object.keys(properties).includes(property.toLowerCase()))
            throw new Error('Invalid server property in: ' + d.function?.compiled.name)
        return properties[property.toLowerCase()](d.ctx?.server)
    }
})