import Team from '../team'
import IEvent from "./event";

export default class GameEvent implements IEvent {
    event = ''
    important = true

    constructor(gameNum: number, t1: Team, t2: Team, t1Wins: number, t2Wins: number) {
        this.event += '**Game ' + gameNum + ' | ' + t1.emoji + ' (' + t1Wins + ' - ' + t2Wins + ') ' + t2.emoji + '**'
    }
}