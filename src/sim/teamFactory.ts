import { Collection, Guild, GuildEmoji, TextChannel } from "discord.js";
import Player from "./player";
import Team from "./team";

export default class TeamFactory {
    create(name: string, abbrev: string, guild: Guild, players: Player[]) : Team {
        let emoji = guild.emojis.cache.find((e) => e.name == abbrev).toString()
        let role = guild.roles.cache.find((r) => r.name == name).toString()
        return new Team(abbrev, abbrev, players, emoji, role)
    }
}