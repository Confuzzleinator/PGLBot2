import Player from "../player";
import Team from "../team";
import IEvent from "./event";

export default class SaveEvent implements IEvent {
    important = false
    event = ''
    constructor(time: string, team: Team, saver: Player, shooter: Player, overtime: boolean) {
        this.event += team.emoji + ' - ' + (overtime ? '+' : '') + time + ' - ' + 
            saver.name + ' saves a shot from ' + shooter.name
    }
}