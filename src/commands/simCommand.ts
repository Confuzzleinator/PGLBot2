import { Message, TextChannel } from "discord.js";
import Database from "../database";
import DiscordOutput from "../discordOutput";
import Player from "../sim/player";
import Series from "../sim/series";
import TeamFactory from "../sim/teamFactory";
import ICommand from "./command";

export default class SimCommand implements ICommand {
    name = 'sim'
    aliases = ['simulate']
    usage = 'sim <team 1> <team 2> [games] [delay]'
    description = 'Simulates a best-of series between the two teams without saving the result.'
    minArgs = 2

    async execute (message: Message, args: string[]) {
        let factory = new TeamFactory()
        let db = new Database()
        let t1Data = await db.getTeam(args[0])
        let t2Data = await db.getTeam(args[1])

        if (t1Data == undefined)
            return message.channel.send("Couldn't find the team " + args[0] + ' ' + message.member.toString())
        if (t2Data == undefined)
            return message.channel.send("Couldn't find the team " + args[1] + ' ' + message.member.toString())

        let t1 = factory.create(t1Data.name, t1Data.abbreviation, message.guild, await db.getPlayers(t1Data.id))
        let t2 = factory.create(t2Data.name, t2Data.abbreviation, message.guild, await db.getPlayers(t2Data.id))

        if (t1.emoji === 'undefined') return message.channel.send("Couldn't find an emoji for " + t1.abbrev)
        if (t1.role === 'undefined') return message.channel.send("Couldn't find a role for " + t1.name)
        if (t2.emoji === 'undefined') return message.channel.send("Couldn't find an emoji for " + t2.abbrev)
        if (t2.role === 'undefined') return message.channel.send("Couldn't find a role for " + t2.name)

        if (args[2] == undefined) args[2] = '3'
        if (args[3] == undefined) args[3] = '2500'

        let series = new Series(t1, t2, parseInt(args[2]), false)
        series.sim()
        let output = new DiscordOutput()
        output.outputAtInterval(message.channel as TextChannel, series.events, parseInt(args[3]))
    }

}