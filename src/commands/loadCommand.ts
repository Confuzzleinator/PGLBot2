import { Message } from "discord.js";
import Database from "../database";
import ICommand from "./command";

export default class LoadCommand implements ICommand {
    name = 'load'
    aliases = []
    usage = 'load'
    description = 'Loads teams and players from the .json files and puts them into the database'
    minArgs = 0
    async execute(message: Message, args: string[]) {
        let db = new Database()
        db.insertTeams()
    }
}