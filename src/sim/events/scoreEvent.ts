import Player from "../player";
import Team from "../team";
import IEvent from "./event";

export default class ScoreEvent implements IEvent {
    important = true
    event = ''

    constructor(time: string, team: Team, scorer: Player, overtime: boolean, assister?: Player) {
        this.event += team.emoji + ' - ' + (overtime ? '+' : '') + time + ' - ' + scorer.name + ' scores'
        if(typeof assister != 'undefined') this.event += ' (assist: ' + assister.name + ')'
    }
}