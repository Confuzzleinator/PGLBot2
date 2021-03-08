import { Message } from "discord.js";
import ICommand from "./command";
import Queue from "../queue";
import TeamFactory from "../sim/teamFactory";
import Database from "../database";
import Series from "../sim/series";

export default class QueueCommand implements ICommand {
    name = 'queue'
    aliases = ['q']
    usage = 'queue <team1> <team2> [gamesToWin] [outputDelay]'
    description = 'Adds a game to the queue'
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

        let series = new Series(t1, t2, parseInt(args[2]), true)
        Queue.queue.push(series)
        message.channel.send("Matchup queued.")
    }

}