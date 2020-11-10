import { Message } from "discord.js";
import Database from "../database";
import Spreadsheet from "../spreadsheet";
import ICommand from "./command";

export default class ExportCommand implements ICommand {
    name = 'export'
    aliases = []
    usage = 'export'
    description = 'Takes all the games saved in the database and puts them in the sheet'
    minArgs = 0
    async execute(message: Message, args: string[]) {
        let sheet = new Spreadsheet()
        let db = new Database()
        await sheet.authenticate()
        await sheet.addGames()
        await db.clearGames()
    }
}