import Team from "../team";
import IEvent from "./event";

export default class SeriesEvent implements IEvent {
    event = ''
    important = true

    constructor(t1: Team, t2: Team) {
        this.event += t1.emoji + ' vs ' + t2.emoji + ' ' + t1.role + ' ' + t2.role
    }
}