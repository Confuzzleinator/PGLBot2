import { Message, TextChannel } from "discord.js";
import Database from "../database";
import DiscordOutput from "../discordOutput";
import Queue from "../queue";
import IEvent from "../sim/events/event";
import Series from "../sim/series";
import ICommand from "./command";

export default class RunCommand implements ICommand {
    name = 'run'
    aliases = []
    usage = 'run [delay]'
    description = 'Sims all matches in the queue in the current channel'
    minArgs = 0
    execute (message: Message, args: string[]) {
        let db = new Database()
        let output = new DiscordOutput()
        for (let i = 0; i < Queue.queue.length; ++i) {
            Queue.queue[i].sim()
            for (let g of Queue.queue[i].games) {
                db.addGame(g, i)
            }
        }

        if (args[0] == undefined) args[0] = '2500'
        this.outputRecurse(Queue.queue, 0, message.channel as TextChannel, parseInt(args[0]), output)
    }

    outputRecurse (queue: Series[], count: number, channel: TextChannel, delay: number, output: DiscordOutput) {
        console.log(queue.length)
        if (count < queue.length) {
            output.outputAtInterval(channel, queue[count].events, delay, () => {
                console.log('Promise resolved.')
                count++
                this.outputRecurse(queue, count, channel, delay, output)
            })
        }
    }

}