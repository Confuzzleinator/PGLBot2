import Player from "../player";
import Team from "../team";
import IEvent from "./event";

export default class ScoreEvent implements IEvent {
    important = true
    event = ''

    constructor(time: string, team: Team, scorer: Player, overtime: boolean, assister?: Player) {
        this.event += team.emoji + ' - ' + (overtime ? '+' : '') + time + ' - ' + this.getFlavor(scorer, assister)
    }

    getFlavor (scorer: Player, assister?: Player): string {
        if (typeof assister != 'undefined') {
            let rand = Math.floor(Math.random() * 4 + 1)
            switch (rand) {
                case 1:
                    return scorer.name + ' rockets one into the back of the net off of a brilliant pass by ' + assister.name
                case 2:
                    return scorer.name + ' sneaks one by the defender and into the goal after being set up by ' + assister.name
                case 3:
                    return assister.name + ' crosses the ball into the waiting bumper of ' + scorer.name + ' who easily puts it into the goal'
                case 4:
                    return assister.name + ' sets up an easy tap in goal for ' + scorer.name + ' who finishes it off'
            }
        } else {
            let rand = Math.floor(Math.random() * 4 + 1)

            switch (rand) {
                case 1:
                    return scorer.name + ' rockets one into the back of the net'
                case 2:
                    return scorer.name + ' sneaks one by the defender and into the goal'
                case 3:
                    return 'What a goal from ' + scorer.name
                case 4:
                    return 'GOOOOOOOOOOOOOOOOOOAAAAAAAAAAAAAAAAALLLLLLLLLLLLLL from a magnificient touch by ' + scorer.name
            }
        }
    }
}