import { Message, TextChannel } from "discord.js";
import IEvent from "./sim/events/event";

export default class DiscordOutput {
    async outputAtInterval (channel: TextChannel, events: IEvent[], delay: number, callback?: () => void): Promise<void> {
        let counter = 0
        let message: Message
        let interval = setInterval(async () => {
            if (counter == 0) {
                message = await channel.send(events[counter].event)
            } else {
                if (events[counter - 1].important || typeof message === 'undefined') {
                    message = await channel.send(events[counter].event)
                } else {
                    message.edit(events[counter].event)
                }
            }
            ++counter
            if (counter >= events.length) {
                clearInterval(interval)
                if (callback) return callback()
            }
        }, delay)
    }
}