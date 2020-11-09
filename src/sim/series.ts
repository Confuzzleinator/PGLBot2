import Team from './team'
import IEvent from "./events/event"
import SeriesEvent from "./events/seriesEvent"
import Game from "./game"
import GameEvent from './events/gameEvent'
import TeamFactory from './teamFactory'
import SeriesSummaryEvent from './events/seriesSummaryEvent'
import Player from './player'
import GameResult from './gameResult'

export default class Series {
    t1: Team
    t2: Team
    gamesToWin: number
    games: GameResult[] = []
    wins = [0, 0]
    events: IEvent[] = []
    ping: boolean

    constructor(t1: Team, t2: Team, gamesToWin: number, ping: boolean) {
        this.t1 = t1
        this.t2 = t2
        this.gamesToWin = gamesToWin
        this.ping = ping
    }

    sim() {
        this.events.push(new SeriesEvent(this.t1, this.t2, this.ping))
        let counter = 1
        while(this.wins[0] < this.gamesToWin && this.wins[1] < this.gamesToWin) {
            this.events.push(new GameEvent(counter, this.t1, this.t2, this.wins[0], this.wins[1]))
            let game = new Game(this.t1, this.t2)
            this.games.push(game.sim())
            if(game.t1.stats.goals > game.t2.stats.goals) {
                this.wins[0]++
            } else {
                this.wins[1]++
            }
            this.t1.stats.zero()
            this.t2.stats.zero()
            for(let player of this.t1.players) player.stats.zero()
            for(let player of this.t2.players) player.stats.zero()
            this.events = this.events.concat(game.events)
            ++counter
        }
        this.events.push(new SeriesSummaryEvent(this))
    }
}