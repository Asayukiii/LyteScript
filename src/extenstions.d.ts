declare global {
    interface String {
        escape(): string
        unescape(): string
    }
}

export {}