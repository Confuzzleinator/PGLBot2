import { Message } from "discord.js";
import ICommand from "./command";
import * as Config from "../../config.json"

export default class CommandHandler {
    execute(message: Message, command: ICommand, args: string[]) {
        if(args.length < command.minArgs) {
            return message.channel.send('Too few arguments.\n' + 'Usage: ' + Config.prefix + command.usage)
        }
        command.execute(message, args)
    }
}