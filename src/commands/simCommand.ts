import { Message, TextChannel } from "discord.js";
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

    execute(message: Message, args: string[]) {
        let factory = new TeamFactory()
        let t1 = factory.create('Ghost Gaming', 'GG', message.guild, 
            [new Player('A', 80, 0), new Player('B', 90, 1), new Player('C', 100, 2)])

        let t2 = factory.create('Echo Fox', 'EF', message.guild,
            [new Player('D', 80, 0), new Player('E', 90, 1), new Player('F', 100, 2)])

        if(t1.emoji === 'undefined') return message.channel.send("Couldn't find an emoji for " + t1.abbrev)
        if(t1.role === 'undefined') return message.channel.send("Couldn't find a role for " + t1.name)
        if(t2.emoji === 'undefined') return message.channel.send("Couldn't find an emoji for " + t2.abbrev)
        if(t2.role === 'undefined') return message.channel.send("Couldn't find a role for " + t2.name)

        let series = new Series(t1, t2, parseInt(args[2]))
        series.sim()
        let output = new DiscordOutput()
        output.outputAtInterval(message.channel as TextChannel, series.events, parseInt(args[3]))
    }

}