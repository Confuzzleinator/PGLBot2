import Player from "./player"
import { game } from '../../config.json' 
import GameStats from "./gameStats"

export default class Team {
    name: string
    abbrev: string
    players: Player[]
    emoji: string
    role: string
    stats: GameStats
    rating: number
    scoringChances: number[]

    constructor(name: string, abbrev: string, players: Player[], emoji: string, role: string) {
        this.name = name
        this.abbrev = abbrev
        this.players = players
        this.emoji = emoji
        this.role = role
        this.rating = 0
        this.stats = new GameStats()

        // Calculate team overall rating, factoring in position penalties
        for(let i = 0; i < this.players.length; ++i) {
            this.rating += this.players[i].rating
        }

        // Calculate scoring, assisting, and saving chances for each player
        for(let i = 0; i < players.length; ++i) {
            if(this.players[i].playstyle == 0) {
                this.players[i].scoringChance = this.players[i].rating + (game.strikerActionProbabilities[0] * this.rating)
                this.players[i].assistingChance = this.players[i].rating + (game.strikerActionProbabilities[1] * this.rating)
                this.players[i].savingChance = this.players[i].rating + (game.strikerActionProbabilities[2] * this.rating)
            } else if(this.players[i].playstyle == 1) {
                this.players[i].scoringChance = this.players[i].rating + (game.guardianActionProbabilities[0] * this.rating)
                this.players[i].assistingChance = this.players[i].rating + (game.guardianActionProbabilities[1] * this.rating)
                this.players[i].savingChance = this.players[i].rating + (game.strikerActionProbabilities[2] * this.rating)
            } else if(this.players[i].playstyle == 2) {
                this.players[i].scoringChance = this.players[i].rating + (game.playmakerActionProbabilities[0] * this.rating)
                this.players[i].assistingChance = this.players[i].rating + (game.playmakerActionProbabilities[1] * this.rating)
                this.players[i].savingChance = this.players[i].rating + (game.strikerActionProbabilities[2] * this.rating)
            } else {
                this.players[i].scoringChance = this.players[i].rating
                this.players[i].assistingChance = this.players[i].rating
                this.players[i].savingChance = this.players[i].rating
            }
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

    getScoringPlayer() : Player {
        let totalScoringChance = 0
        for(let player of this.players) {
            totalScoringChance += player.scoringChance
        }
        let rand = Math.random() * totalScoringChance
        let total = 0
        for(let player of this.players) {
            total += player.scoringChance
            if(rand <= total) return player
        }
    }

    getAssistingPlayer(scorer: Player) : Player {
        let totalChance = 0
        for(let player of this.players) {
            if(player != scorer) totalChance += player.assistingChance
        } 
        let rand = Math.random() * totalChance
        let total = 0
        for(let player of this.players) {
            if(player != scorer) {
                total += player.assistingChance
                if(rand <= total) return player
            }
        }
    }

    getSavingPlayer() : Player {
        let totalChance = 0
        for(let player of this.players) totalChance += player.savingChance
        let rand = Math.random() * totalChance
        let total = 0
        for(let player of this.players) {
            total += player.savingChance
            if(rand <= total) return player
        }
    }
}