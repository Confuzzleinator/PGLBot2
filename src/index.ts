import { Client } from 'discord.js'
import * as Config from '../config.json'
import 'dotenv/config'
import CommandHandler from './commands/commandHandler'
import SimCommand from './commands/simCommand'
import LoadCommand from './commands/loadCommand'
import ExportCommand from './commands/exportCommand'
import ClearCommand from './commands/clearCommand'
import SeriesCommand from './commands/seriesCommand'
import QueueCommand from './commands/queueCommand'
import RunCommand from './commands/runCommand'

const client = new Client()
client.login(process.env.DISCORD_BOT_KEY)
let handler = new CommandHandler()


client.on('ready', () => {
    client.user.setActivity(Config.activity)
    console.log('Bot initialized.')
})

client.on('message', (message) => {
    if (!message.content.startsWith(Config.prefix) || message.author.bot) return
    const args = message.content.slice(Config.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (command == 'sim') {
        handler.execute(message, new SimCommand(), args)
    } else if (command == 'load') {
        handler.execute(message, new LoadCommand(), args)
    } else if (command == 'export') {
        handler.execute(message, new ExportCommand(), args)
    } else if (command == 'clear') {
        handler.execute(message, new ClearCommand(), args)
    } else if (command == 'series') {
        handler.execute(message, new SeriesCommand(), args)
    } else if (command == 'queue' || command == 'q') {
        handler.execute(message, new QueueCommand, args)
    } else if (command == 'run' || command == 'r') {
        handler.execute(message, new RunCommand(), args)
    }
})