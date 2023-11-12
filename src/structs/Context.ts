import { Message, Member, Server, User, Channel, MessagePayload } from 'revkit'
import { Bot } from './Bot'

type AnyContext = Message | Member | Server | User | null | undefined

export class Context {
    public args: string[] = []
    public bot: Bot
    private ctx: AnyContext
    constructor(ctx: AnyContext, bot: Bot) {
        this.ctx = ctx
        this.bot = bot
    }

    /**
     * Set context arguments.
     * @param args Array of strings.
     */
    setArgs(args: string[]) {
        this.args = args
    }

    /**
     * Points to the current channel.
     */
    get channel() {
        return this.ctx instanceof Channel 
            ? this.ctx : this.ctx instanceof Message
                ? this.ctx.channel : null
    }

    /**
     * Points to the message author as member.
     */
    get member() {
        return this.ctx instanceof Member ? this.ctx : null
    }

    /**
     * Points to the message.
     */
    get message() {
        return this.ctx instanceof Message ? this.ctx : null
    }

    /**
     * Points to the current server.
     */
    get server() {
        return this.ctx instanceof Server
            ? this.ctx : this.ctx instanceof Message
                ? this.ctx.server : 'server' in this.ctx!
                    ? this.ctx.server : null
    }

    /**
     * Points to the message author user.
     */
    get user() {
        return this.ctx instanceof User 
            ? this.ctx : this.ctx instanceof Message 
                ? this.ctx.author : this.ctx instanceof Member
                    ? this.ctx.user : null
    }

    /**
     * Send a message.
     * @param message 
     * @returns 
     */
    async send(message: MessagePayload) {
        if (this.channel) {
            return await this.channel.send(message)
        }
    }
}