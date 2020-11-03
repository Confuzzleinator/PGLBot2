import { Message } from "discord.js";
import Game from "../sim/game";
import Player from "../sim/player";
import Team from "../sim/team";
import ICommand from "./command";

export default class SimCommand implements ICommand {
    name = 'sim'
    aliases = ['simulate']
    usage = 'sim <team 1> <team 2> [games] [delay]'
    description = 'Simulates a best-of series between the two teams without saving the result.'
    minArgs = 2

    execute(message: Message, args: string[]) {
        let t1 = new Team('Golden Guardians', 'GG', 
            [new Player('A', 80, 0), new Player('B', 90, 1), new Player('C', 100, 2)], '', '')
        let t2 = new Team('100 Thieves', '100', 
            [new Player('D', 80, 0), new Player('E', 90, 1), new Player('F', 100, 2)], '', '')
        let game = new Game(t1, t2)
        game.sim()
    }

}