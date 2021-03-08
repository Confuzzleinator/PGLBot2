import Team from "../team";
import Player from "../player";
import IEvent from "./event";

export default class MissEvent implements IEvent {
    important = false
    event = ''
    constructor(time: string, team: Team, shooter: Player, overtime: boolean) {
        this.event += team.emoji + ' - ' + (overtime ? '+' : '') + time + ' - ' + shooter.name + ' misses a shot'
    }
}