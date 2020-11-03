export default class Player {
    name: string
    rating: number
    playstyle: number
    goals: number
    assists: number
    saves: number
    shots: number
    scoringChance: number
    assistingChance: number
    savingChance: number

    constructor(name: string, rating: number, playstyle: number) {
        this.name = name
        this.rating = rating
        this.playstyle = playstyle
        this.goals = 0
        this.assists = 0
        this.saves = 0
        this.shots = 0
        this.scoringChance = 0
        this.assistingChance = 0
        this.savingChance = 0
    }
}