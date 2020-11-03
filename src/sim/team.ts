import Player from "./player"
import { game } from '../../config.json' 

export default class Team {
    name: string
    abbrev: string
    players: Player[]
    emoji: string
    role: string
    goals: number
    rating: number

    constructor(name: string, abbrev: string, players: Player[], emoji: string, role: string) {
        this.name = name
        this.abbrev = abbrev
        this.players = players
        this.emoji = emoji
        this.role = role
        this.goals = 0
        this.rating = 0

        // Calculate team overall rating, factoring in position penalties
        for(let i = 0; i < this.players.length; ++i) {
            this.rating += this.players[i].rating
        }
        // Position penalties
        if (
            this.players[0].playstyle != 3 &&
            this.players[0].playstyle == this.players[1].playstyle &&
            this.players[0].playstyle == this.players[2].playstyle
            ) {
            this.rating -= game.triplePlaystylePenalty
            } else if (
            this.players[0].playstyle != 3 &&
            (this.players[0].playstyle == this.players[1].playstyle || this.players[0].playstyle == this.players[2].playstyle)
            ) {
            this.rating -= game.doublePlaystylePenalty
            } else if (this.players[1].playstyle != 3 && this.players[1].playstyle == this.players[2].playstyle) {
            this.rating -= game.doublePlaystylePenalty
        }


    }
}