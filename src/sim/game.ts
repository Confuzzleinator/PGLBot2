import Team from './team'
import IEvent from "./events/event";
import { game } from '../../config.json'

export default class Game {
    t1: Team
    t2: Team
    events: IEvent[]

    constructor(t1: Team, t2: Team) {
        this.t1 = t1
        this.t2 = t2
    }

    sim() : void {
        let t1Odds = game.shotChance + (this.t1.rating - this.t2.rating) * game.ratingDiffMultiplier
        let t2Odds = game.shotChance + (this.t2.rating - this.t1.rating) * game.ratingDiffMultiplier

        if(t1Odds < game.minShotChance) t1Odds = game.minShotChance
        if(t2Odds < game.minShotChance) t1Odds = game.minShotChance
        
        for(let time = game.gameLength; time >= 0; --time) {
            console.log('Simming ' + time)
        }
    }
}