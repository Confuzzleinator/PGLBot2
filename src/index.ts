import { Client } from 'discord.js'
import * as Config from '../config.json'
import 'dotenv/config'
import CommandHandler from './commands/commandHandler'
import SimCommand from './commands/simCommand'
import Database from './database'
import LoadCommand from './commands/loadCommand'

const client = new Client()
client.login(process.env.DISCORD_BOT_KEY)
let handler =  new CommandHandler()

client.on('ready', () => {
    client.user.setActivity(Config.activity)
    console.log('Bot initialized.')
})

client.on('message', (message) => {
    if(!message.content.startsWith(Config.prefix) || message.author.bot) return
    const args = message.content.slice(Config.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if(command == 'sim') {
        handler.execute(message, new SimCommand(), args)
    } else if(command == 'load') {
        handler.execute(message, new LoadCommand(), args)
    }
})