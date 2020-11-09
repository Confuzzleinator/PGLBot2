import Team from '../team'
import IEvent from "./event";

export default class GameResultEvent implements IEvent {
    event = ''
    important = true

    constructor(t1: Team, t2: Team) {
        this.event += '--- ' + t1.emoji + ' (' + t1.stats.goals + ' - ' + t2.stats.goals + ') ' + t2.emoji + ' ---'
    }
}