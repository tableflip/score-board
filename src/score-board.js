var localforage = require('localforage')
var ScoreBoard = function (teams, cb) {
  this.teams = teams
  init.call(this, teams, cb)
}
module.exports = ScoreBoard

function init (teams, cb) {
  var self = this
  teams.forEach(function (team) {
    self[team] = new Interface(team)
    localforage.setItem(team+'score', 0)
  })
  cb(null, teams)
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
    }
  }
}
