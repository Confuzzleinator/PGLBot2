import IEvent from "./event";
import { MessageEmbed } from 'discord.js' 
import Series from "../series";

export default class SeriesSummaryEvent implements IEvent {
    event: MessageEmbed
    important = true

    constructor(series: Series) {
        let t1Goals = 0
        let t1Shots = 0
        let t1Assists = 0
        let t1Saves = 0
        let t2Goals = 0
        let t2Shots = 0
        let t2Assists = 0
        let t2Saves = 0
        let t1PlayerGoals = [0, 0, 0]
        let t1PlayerShots = [0, 0, 0]
        let t1PlayerAssists = [0, 0, 0]
        let t1PlayerSaves = [0, 0, 0]
        let t2PlayerGoals = [0, 0, 0]
        let t2PlayerShots = [0, 0, 0]
        let t2PlayerAssists = [0, 0, 0]
        let t2PlayerSaves = [0, 0, 0]

        for(let game of series.games) {
            for(let i = 0; i < series.t1.players.length; ++i) {
                t1PlayerGoals[i] += game.t1.players[i].goals
                t1PlayerShots[i] += game.t1.players[i].shots
                t1PlayerAssists[i] += game.t1.players[i].assists
                t1PlayerSaves[i] += game.t1.players[i].saves
                t2PlayerGoals[i] += game.t2.players[i].goals
                t2PlayerShots[i] += game.t2.players[i].shots
                t2PlayerAssists[i] += game.t2.players[i].assists
                t2PlayerSaves[i] += game.t2.players[i].saves
                t1Goals += game.t1.players[i].goals
                t1Shots += game.t1.players[i].shots
                t1Assists += game.t1.players[i].assists
                t1Saves += game.t1.players[i].saves
                t2Goals += game.t2.players[i].goals
                t2Shots += game.t2.players[i].shots
                t2Assists += game.t2.players[i].assists
                t2Saves += game.t2.players[i].saves
            }
        }

        this.event = new MessageEmbed()
            .setColor('#67d339')
            .setTitle(
                series.t1.emoji +
                  series.t1.name +
                  ' ' +
                  series.wins[0] +
                  ' - ' +
                  series.wins[1] +
                  ' ' +
                  series.t2.emoji +
                  series.t2.name,
              )
              .setDescription(
                '**Team Stats**' +
                  '\n' +
                  series.t1.emoji +
                  ' - ' +
                  t1Goals + 'g/' + t1Assists + 'a/' + t1Saves + 'sv/' + t1Shots + 'sh' +
                  '\n' +
                  series.t2.emoji +
                  ' - ' +
                  t2Goals + 'g/' + t2Assists + 'a/' + t2Saves + 'sv/' + t2Shots + 'sh' +
                  '\n\n' +
                  '**Player Goals**' +
                  '\n' +
                  series.t1.emoji +
                  series.t1.players[0].name +
                  ' - ' +
                  t1PlayerGoals[0] + 'g/' + t1PlayerAssists[0] + 'a/' + t1PlayerSaves[0] + 'sv/' + t1PlayerShots[0] + 'sh' +
                  '\n' +
                  series.t1.emoji +
                  series.t1.players[1].name +
                  ' - ' +
                  t1PlayerGoals[1] + 'g/' + t1PlayerAssists[1] + 'a/' + t1PlayerSaves[1] + 'sv/' + t1PlayerShots[1] + 'sh' +
                 '\n' +
                  series.t1.emoji +
                  series.t1.players[2].name +
                  ' - ' +
                  t1PlayerGoals[2] + 'g/' + t1PlayerAssists[2] + 'a/' + t1PlayerSaves[2] + 'sv/' + t1PlayerShots[2] + 'sh' +                  
                  '\n' +
                  series.t2.emoji +
                  series.t2.players[0].name +
                  ' - ' +
                  t2PlayerGoals[0] + 'g/' + t2PlayerAssists[0] + 'a/' + t2PlayerSaves[0] + 'sv/' + t2PlayerShots[0] + 'sh' +                 
                  '\n' +
                  series.t2.emoji +
                  series.t2.players[1].name +
                  ' - ' +
                  t2PlayerGoals[1] + 'g/' + t2PlayerAssists[1] + 'a/' + t2PlayerSaves[1] + 'sv/' + t2PlayerShots[1] + 'sh' +                  
                  '\n' +
                  series.t2.emoji +
                  series.t2.players[2].name +
                  ' - ' +
                  t2PlayerGoals[2] + 'g/' + t2PlayerAssists[2] + 'a/' + t2PlayerSaves[2] + 'sv/' + t2PlayerShots[0] + 'sh'             
              )
    }
}