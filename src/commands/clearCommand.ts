import { Message } from "discord.js";
import Database from "../database";
import ICommand from "./command";

export default class ClearCommand implements ICommand {
    name = 'clear'
    aliases = []
    usage = 'clear'
    description = 'Clears all games out of the database'
    minArgs: number;
    execute(message: Message, args: string[]) {
        let db = new Database()
        db.clearGames()
    }

}