import { GoogleSpreadsheet } from 'google-spreadsheet'
import * as path from 'path'
import Database from './database'

export default class Spreadsheet {
    doc: GoogleSpreadsheet
    constructor() {
        this.doc = new GoogleSpreadsheet(process.env.SHEET_ID)
    }

    async authenticate() {
        await this.doc.useServiceAccountAuth(require(path.join(__dirname, '..', 'google.creds.json')))
        await this.doc.loadInfo()
    }

    async addGames() {
        const sheet = await this.doc.sheetsByTitle[process.env.SHEET_NAME]
        let db = new Database()
        let results = await db.getGames()
        for (let i = 0; i < results[0].length; ++i) {
            let r = results[0][i]
            let t1Goals = r.t1Goals1 + r.t1Goals2 + r.t1Goals3
            let t2Goals = r.t2Goals1 + r.t2Goals2 + r.t2Goals3
            let t1Assists = r.t1Assists1 + r.t1Assists2 + r.t1Assists3
            let t2Assists = r.t2Assists1 + r.t2Assists2 + r.t2Assists3
            let t1Saves = r.t1Saves1 + r.t1Saves2 + r.t1Saves3
            let t2Saves = r.t2Saves1 + r.t2Saves2 + r.t2Saves3
            let t1Shots = r.t1Shots1 + r.t1Shots2 + r.t1Shots3
            let t2Shots = r.t2Shots1 + r.t2Shots2 + r.t2Shots3
            let winner = t1Goals > t2Goals ? r.t1 : r.t2
            let loser = t1Goals > t2Goals ? r.t2 : r.t1
            await sheet.addRow([
            r.seriesId,
            r.id,
            r.t1,
            r.t2,
            t1Goals,
            t2Goals,
            t1Assists,
            t2Assists,
            t1Saves,
            t2Saves,
            t1Shots,
            t2Shots,
            winner,
            loser,
            r.t1Player1,
            r.t1Player2,
            r.t1Player3,
            r.t2Player1,
            r.t2Player2,
            r.t2Player3,
            r.t1Goals1,
            r.t1Goals2,
            r.t1Goals3,
            r.t2Goals1,
            r.t2Goals2,
            r.t2Goals3,
            r.t1Assists1,
            r.t1Assists2,
            r.t1Assists3,
            r.t2Assists1,
            r.t2Assists2,
            r.t2Assists3,
            r.t1Saves1,
            r.t1Saves2,
            r.t1Saves3,
            r.t2Saves1,
            r.t2Saves2,
            r.t2Saves3,
            r.t1Shots1,
            r.t1Shots2,
            r.t1Shots3,
            r.t2Shots1,
            r.t2Shots2,
            r.t2Shots3,
            ])
        }
        console.log('Export complete.')
    }
}