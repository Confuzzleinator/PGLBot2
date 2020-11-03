import { Message } from "discord.js";

export default interface ICommand {
    name: string
    aliases: string[]
    usage: string
    description: string
    minArgs: number

    execute(message: Message, args: string[])
}