import Player from "../player";
import Team from "../team";
import IEvent from "./event";

export default class SaveEvent implements IEvent {
    important = false
    event = ''
    constructor(time: string, team: Team, saver: Player, shooter: Player, overtime: boolean) {
        this.event += team.emoji + ' - ' + (overtime ? '+' : '') + time + ' - ' + this.getFlavor(saver, shooter)
    }

    getFlavor (saver: Player, shooter: Player): string {
        let rand = Math.floor(Math.random() * 3 + 1)

        switch (rand) {
            case 1:
                return saver.name + ' comes up with a beautiful save out of nowhere, ' + shooter.name + ' does not look happy about that'
            case 2:
                return 'The shot from ' + shooter.name + ' looked like it was going in but ' + saver.name
                    + ' came out of nowhere to put a stop to that'
            case 3:
                return shooter.name + ' fires off a quick shot but its blocked by ' + saver.name
        }
    }
}