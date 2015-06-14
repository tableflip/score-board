var localforage = require('localforage')
var async = require('async')
var ScoreBoard = function (teams, cb) {
  this._teams = teams.slice()
  this.teams = teams
  init.call(this, teams, cb)
}
module.exports = ScoreBoard

function init (teams, cb) {
  var scoreBoard = this
  async.each(teams.slice().reverse(), function (team, cb) {
    scoreBoard[team] = new Interface(team)
    localforage.setItem(team + 'score', 0, cb)
  },
  function (err) {
    if (err) return console.error(err)
    console.log('done init scoreboard', scoreBoard)
    cb(null, scoreBoard.teams)
  })
}

function Interface (team) {
  return {
    getScore: function (cb) {
      localforage.getItem(team+'score', cb)
    },
    addScore: function (score, cb) {
      localforage.getItem(team+'score', function (err, total) {
        if (err) throw new Error('Boo can\'t recover score')
        if (!total) return localforage.setItem(team+'score', score, cb)
        var newScore = parseInt(total) + parseInt(score)
        localforage.setItem(team+'score', newScore, cb)
      })
    },
    deduct: function (score, cb) {
      localforage.getItem(team+'score', function (err, total) {
        if (err) throw new Error('Boo can\'t recover score')
        var newScore = parseInt(total) - parseInt(score)
        localforage.setItem(team+'score', newScore, cb)
      })      
    },
    players: {},
    addPlayer: function (key, value, cb) {
      this.players[key] = function (cb) {
        localforage.getItem(team+key, cb)
      }
      localforage.setItem(team+key, value, cb)
    }
  }
}
