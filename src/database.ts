import {createConnection, Connection, RowDataPacket} from 'mysql2'
import * as fs from 'fs'
import * as path from 'path'
import Player from './sim/player'

export default class Database {
    db: Connection
    queries = {
        clearTeamsTable: 'TRUNCATE TABLE Teams',
        clearPlayersTable: 'TRUNCATE TABLE Players',
        clearGamesTable: 'TRUNCATE TABLE Games',
        insertTeams: 'INSERT INTO Teams (name, abbreviation) VALUES',
        insertPlayers: 'INSERT INTO Players (name, rating, playstyle, team, rosterPos) VALUES',
        findTeamFromAbbrev: 'SELECT id FROM Teams WHERE abbreviation="',
        updatePlayersTeam: 'UPDATE Players team=',
      }


    constructor() {
        this.db = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })

        this.db.connect()
    }

    insertTeams() {
        fs.readFile(path.join(__dirname, '..', 'teams.json'), (err, data) => {
            if(err) return console.log('Could not load teams.json: ' + err)
            this.db.query(this.queries.clearTeamsTable, (error, results, fields) => {
                if (error) return console.log('Database error while clearing Teams table: ' + error)
            })
          
            let json = JSON.parse(data.toString())
            let query = this.queries.insertTeams
            for (let i = 0; i < json.length; ++i) {
                query += ' ("' + json[i].TeamDiscordAt + '", "' + json[i].Team + '"),'
            }
            query = query.slice(0, -1) + ';'
            this.db.query(query, (error, results, fields) => {
            if (error) return console.log('Database error while inserting teams: ' + error)
                console.log('Inserted teams.')
                this.insertPlayers()
            })
        })
    }

    insertPlayers() {
        fs.readFile(path.join(__dirname, '..', 'players.json'), async (err, data) => {
            if (err) return console.log('Could not load players.json')
            this.db.query(this.queries.clearPlayersTable, (error, results, fields) => {
              if (error) return console.log('Database error while clearing Players table: ' + error)
            })
        
            let json = JSON.parse(data.toString())
            let query = this.queries.insertPlayers
            for (let i = 0; i < json.length; ++i) {
              let playstyle, team, rosterPos
              // Convert playstyle from string to an integer
            switch (json[i].Playstyle) {
                case 'Striker':
                  playstyle = 0
                  break
                case 'Guardian':
                  playstyle = 1
                  break
                case 'Playmaker':
                  playstyle = 2
                  break
                default:
                  playstyle = 3
            }
        
              // Convert team from an abbreviation to an id
              let r = await this.db.promise().query(this.queries.findTeamFromAbbrev + json[i].Team + '";')
              if (r[0][0] == undefined) {
                team = -1
              } else {
                team = r[0][0].id
              }
        
              rosterPos = json[i].RosterPos.toString().slice(-1)
              query +=
                ' ("' + json[i].Player + '", ' + json[i].Rating + ', ' + playstyle + ', ' + team + ', ' + rosterPos + '),'
            }
            query = query.slice(0, -1) + ';'
            this.db.query(query, (error, results, fields) => {
              if (error) return console.log('Database error while inserting players: ' + error)
              console.log('Inserted players.')
            })
          })
    }

    async getPlayers(teamId: number) {
        let rows = await this.db.promise().query('SELECT * FROM Players WHERE team=' + teamId + ';') as RowDataPacket[]
        let players = []
        for (let i = 0; i < rows[0].length; ++i) {
            if (rows[0][i].rosterPos > 0 && rows[0][i].rosterPos < 4) {
                players.push(new Player(rows[0][i].name, rows[0][i].rating, rows[0][i].playstyle))
            }
        }
        return players
    }
}