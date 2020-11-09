import Player from "./player";

export default class PlayerResult {
    player: Player
    goals: number
    assists: number
    saves: number
    shots: number

    constructor(player: Player) {
        this.player = player
        this.goals = player.stats.goals
        this.assists = player.stats.assists
        this.saves = player.stats.saves
        this.shots = player.stats.shots
    }
}