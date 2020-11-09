import IEvent from "./events/event";
import TeamResult from "./teamResult";

export default class GameResult {
    t1: TeamResult
    t2: TeamResult

    constructor(t1: TeamResult, t2: TeamResult) {
        this.t1 = t1
        this.t2 = t2
    }
}