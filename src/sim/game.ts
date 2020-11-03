import Team from './team'
import IEvent from "./events/event";
import { game } from '../../config.json'
import ScoreEvent from './events/scoreEvent';
import SaveEvent from './events/saveEvent';
import MissEvent from './events/missEvent';
import { type } from 'os';
import OvertimeEvent from './events/overtimeEvent';

export default class Game {
    t1: Team
    t2: Team
    events: IEvent[]

    constructor(t1: Team, t2: Team) {
        this.t1 = t1
        this.t2 = t2
        this.events = []
    }

    sim() : void {
        let t1Odds = game.shotChance + (this.t1.rating - this.t2.rating) * game.ratingDiffMultiplier
        let t2Odds = game.shotChance + (this.t2.rating - this.t1.rating) * game.ratingDiffMultiplier

        if(t1Odds < game.minShotChance) t1Odds = game.minShotChance
        if(t2Odds < game.minShotChance) t1Odds = game.minShotChance
        let time = game.gameLength
        let simming = true
        while(simming) {
            let rand = Math.random()
            if(rand < t1Odds) {
                this.shoot(this.t1, this.t2, time, time < 0 ? true : false)
            } else if(rand < t2Odds + t1Odds) {
                this.shoot(this.t2, this.t1, time, time < 0 ? true : false)
            }

            if(time <= 0 && this.t1.goals != this.t2.goals) {
                simming = false
            } else if (time == 0) {
                this.events.push(new OvertimeEvent())
            }

            --time
        }
    }

    doesScore() : boolean {
        return Math.random() < game.scoreChance
    }

    doesAssist() : boolean {
        return Math.random() < game.assistChance
    }

    doesSave() : boolean {
        return Math.random() < game.saveChance
    }

    shoot(attackTeam: Team, defenseTeam: Team, time: number, overtime: boolean) {
        attackTeam.shots++
        if(this.doesScore()) {
            this.score(attackTeam, time, overtime)
        } else {
            if(this.doesSave()) {
                this.save(defenseTeam, attackTeam, time, overtime)
            } else {
                this.miss(attackTeam, time, overtime)
            }
        }
    }

    score(team: Team, time: number, overtime: boolean) {
        team.goals++
        let p = team.getScoringPlayer()
        p.goals++
        p.shots++
        if(this.doesAssist()) {
            team.assists++
            let assister = team.getAssistingPlayer(p)
            assister.assists++
            this.events.push(new ScoreEvent(this.formatTime(time), team, p, overtime, assister))
        } else {
            this.events.push(new ScoreEvent(this.formatTime(time), team, p, overtime))
        }
    }

    save(saveTeam: Team, shotTeam: Team, time: number, overtime: boolean) {
        saveTeam.saves++
        let saver = saveTeam.getSavingPlayer()
        saver.saves++
        let shooter = shotTeam.getScoringPlayer()
        shooter.shots++
        this.events.push(new SaveEvent(this.formatTime(time), saveTeam, saver, shooter, overtime))
    }

    miss(team: Team, time: number, overtime: boolean) {
        let p = team.getScoringPlayer()
        p.shots++
        this.events.push(new MissEvent(this.formatTime(time), team, p, overtime))
    }

    formatTime(time: number) : string {
        let t = ''
        time = Math.abs(time)
        t += Math.floor(time / 60)
        t += ':'
        if(time % 60 < 10) t += '0'
        t += time % 60
        return t
    }
}