import GameStats from "./gameStats"

export default class Player {
    name: string
    rating: number
    playstyle: number
    stats: GameStats
    scoringChance: number
    assistingChance: number
    savingChance: number

    constructor(name: string, rating: number, playstyle: number) {
        this.name = name
        this.rating = rating
        this.playstyle = playstyle
        this.scoringChance = 0
        this.assistingChance = 0
        this.savingChance = 0
        this.stats = new GameStats()
    }
}