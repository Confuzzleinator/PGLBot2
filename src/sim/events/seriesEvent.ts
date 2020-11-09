import Team from "../team";
import IEvent from "./event";

export default class SeriesEvent implements IEvent {
    event = ''
    important = true

    constructor(t1: Team, t2: Team, ping: boolean) {
        this.event += t1.emoji + ' vs ' + t2.emoji + (ping ? ' ' + t1.role + ' ' + t2.role : '')
    }
}