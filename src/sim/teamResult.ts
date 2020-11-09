import Team from './team'
import PlayerResult from "./playerResult";

export default class TeamResult {
    team: Team
    players: PlayerResult[]
    goals: number
    assists: number
    saves: number
    shots: number
    
    constructor(team: Team, players: PlayerResult[]) {
        this.team = team
        this.players = players
        this.goals = team.stats.goals
        this.assists = team.stats.assists
        this.saves = team.stats.saves
        this.shots = team.stats.shots
    }
}