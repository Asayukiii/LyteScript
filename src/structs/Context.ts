import { BaseMessage, Message, Member, Server, User, Channel, MessagePayload, Emoji, Role, ServerChannel } from 'revkit'
import { Bot } from './Bot'

type ContextData = {
    channel?: Channel | ServerChannel
    emoji?: Emoji
    member?: Member
    message?: BaseMessage | Message
    role?: Role
    server?: Server
    user?: User
}

type AnyContext = ContextData | null | undefined

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
        return this.ctx?.channel ?? this.ctx?.message?.channel ?? null
    }

    /**
     * Points to the message author as member.
     */
    get member() {
        return this.ctx?.member ?? null
    }

    /**
     * Points to the message.
     */
    get message() {
        return this.ctx?.message ?? null
    }

    /**
     * Points to the current server.
     */
    get server() {
        return this.ctx?.server ?? this.ctx?.message?.server ?? null
    }

    /**
     * Points to the message author user.
     */
    get user() {
        return this.ctx?.user ?? this.ctx?.member?.user ?? null
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