import { MessageEmbed } from "discord.js";

export default interface IEvent {
    event: string | MessageEmbed
    important: boolean
}