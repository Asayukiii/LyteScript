import { ClientEvents } from 'revkit'
import { Bot } from './Bot'

type NativeEventOptions = {
    /**
     * Event name.
     */
    name: keyof ClientEvents
    /**
     * Event listener
     * @param client NiteScript client.
     * @param args Event args.
     */
    listen: (client: Bot, ...args: any) => Promise<any>
}

export class NativeEvent {
    name: keyof ClientEvents
    listen: (client: Bot, ...args: any) => Promise<any>
    constructor(data: NativeEventOptions) {
        this.name = data.name
        this.listen = data.listen
    }
}