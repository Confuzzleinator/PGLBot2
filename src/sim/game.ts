import Team from './team'
import IEvent from "./events/event";
import { game } from '../../config.json'
import ScoreEvent from './events/scoreEvent';
import SaveEvent from './events/saveEvent';
import MissEvent from './events/missEvent';
import OvertimeEvent from './events/overtimeEvent';
import GameResultEvent from './events/gameResultEvent';
import GameResult from './gameResult';
import TeamResult from './teamResult';
import PlayerResult from './playerResult';

export default class Game {
    t1: Team
    t2: Team
    events: IEvent[]

    constructor(t1: Team, t2: Team) {
        this.t1 = t1
        this.t2 = t2
        this.events = []
    }

    sim() : GameResult {
        let t1Odds = game.shotChance + ((this.t1.rating - this.t2.rating) * game.ratingDiffMultiplier)
        let t2Odds = game.shotChance + ((this.t2.rating - this.t1.rating) * game.ratingDiffMultiplier)

        if(t1Odds < game.minShotChance) t1Odds = game.minShotChance
        if(t2Odds < game.minShotChance) t2Odds = game.minShotChance
        let time = game.gameLength
        let simming = true
        while(simming) {
            let rand = Math.random()
            if(rand < t1Odds) {
                this.shoot(this.t1, this.t2, time, time < 0 ? true : false)
            } else if(rand < t2Odds + t1Odds) {
                this.shoot(this.t2, this.t1, time, time < 0 ? true : false)
            }

            if(time <= 0 && this.t1.stats.goals != this.t2.stats.goals) {
                simming = false
            } else if (time == 0) {
                this.events.push(new OvertimeEvent())
            }

            --time
        }
        this.events.push(new GameResultEvent(this.t1, this.t2))

        // Create results object and return it
        let t1Result = new TeamResult(this.t1, [new PlayerResult(this.t1.players[0]), new PlayerResult(this.t1.players[1]), new PlayerResult(this.t1.players[2])])
        let t2Result = new TeamResult(this.t2, [new PlayerResult(this.t2.players[0]), new PlayerResult(this.t2.players[1]), new PlayerResult(this.t2.players[2])])

        return new GameResult(t1Result, t2Result)
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
        attackTeam.stats.shots++
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
        team.stats.goals++
        let p = team.getScoringPlayer()
        p.stats.goals++
        p.stats.shots++
        if(this.doesAssist()) {
            team.stats.assists++
            let assister = team.getAssistingPlayer(p)
            assister.stats.assists++
            this.events.push(new ScoreEvent(this.formatTime(time), team, p, overtime, assister))
        } else {
            this.events.push(new ScoreEvent(this.formatTime(time), team, p, overtime))
        }
    }

    save(saveTeam: Team, shotTeam: Team, time: number, overtime: boolean) {
        saveTeam.stats.saves++
        let saver = saveTeam.getSavingPlayer()
        saver.stats.saves++
        let shooter = shotTeam.getScoringPlayer()
        shooter.stats.shots++
        this.events.push(new SaveEvent(this.formatTime(time), saveTeam, saver, shooter, overtime))
    }

    miss(team: Team, time: number, overtime: boolean) {
        let p = team.getScoringPlayer()
        p.stats.shots++
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