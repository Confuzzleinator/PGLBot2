import Team from "../team";
import Player from "../player";
import IEvent from "./event";

export default class MissEvent implements IEvent {
    important = false
    event = ''
    constructor(time: string, team: Team, shooter: Player, overtime: boolean) {
        this.event += team.emoji + ' - ' + (overtime ? '+' : '') + time + ' - ' + this.getFlavor(shooter)
    }

    getFlavor (shooter: Player): string {
        let rand = Math.floor(Math.random() * 5 + 1)

        switch (rand) {
            case 1:
                return shooter.name + ' fires off a magnificient shot but it clangs of the crossbar'
            case 2:
                return shooter.name + ' takes a wild shot that comes nowhere near the goal'
            case 3:
                return shooter.name + " misses an easy shot, he's gonna regret that"
            case 4:
                return 'Oof, ' + shooter.name + ' misses a shot narrowly. I thought he had that.'
            case 5:
                return 'What was that shot from ' + shooter.name + '? Was he aiming for the ceiling?'
        }
    }
}