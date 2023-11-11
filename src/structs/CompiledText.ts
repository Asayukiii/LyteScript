/**
 * Represents a compiled text.
 */
export class CompiledText {
    value = ''
    /**
     * Writes the text value.
     * @param value Text value.
     */
    set(value: string) {
        this.value = value
    }

    /**
     * Write a character into the text value.
     * @param value Character to write.
     */
    write(value: string) {
        this.value += value
    }
}