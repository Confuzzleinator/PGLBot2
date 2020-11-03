export default class Player {
    name: string
    rating: number
    playstyle: number
    goals: number
    assists: number
    saves: number

    constructor(name: string, rating: number, playstyle: number) {
        this.name = name
        this.rating = rating
        this.playstyle = playstyle
        this.goals = 0
        this.assists = 0
        this.saves = 0
    }
}