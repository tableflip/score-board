var localforage = require('localforage')
var ScoreBoard = function (teams, cb) {
  this.teams = teams.slice()
  init.call(this, teams, cb)
}
module.exports = ScoreBoard

function init (teams, cb) {
  var self = this
  if (teams.length == 0) {
    return cb.call(self, null, this.teams)
  }
  var team = teams.pop()
  self[team] = new Interface(team)
  localforage.setItem(team+'score', 0, function (err, done) {
    if (err) throw new Error(err)
    init.call(self, teams, cb)
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
        localforage.getItem(team+key+value, cb)
      }
      localforage.setItem(team+key+value, value, cb)
    }
  }
}
