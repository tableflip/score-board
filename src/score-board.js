var localforage = require('localforage')
var async = require('async')

var ScoreBoard = function (initTeams, cb) {
  var self = this
  self.reset = function (cb) {localforage.reset(cb)}
  self.teams = initTeams.slice()
  init.call(self, initTeams, cb)
}

module.exports = ScoreBoard

function init (teams, cb) {
  var self = this
  if (teams.length === 0) {
    return cb(null, self)
  }
  var team = teams.pop()
  self[team] = new Interface(team)
  init.call(self, teams, cb)
}

function Interface (team) {
  this.team = function () {
    return team.slice()
  }
  return this
}
Interface.prototype.getScore = function (cb) {
  var teamKey = this.team()
  localforage.getItem(teamKey+'score', cb)
}
Interface.prototype.addScore = function (score, cb) {

  var teamKey = this.team()

  localforage.getItem(teamKey+'score', function (err, total) {
    if (err) throw new Error('Boo can\'t recover score')
    if (!total) return localforage.setItem(teamKey+'score', score, cb)
    var newScore = parseInt(total) + parseInt(score)
    localforage.setItem(teamKey+'score', newScore, cb)
  })
}
Interface.prototype.deduct = function (score, cb) {

  var teamKey = this.team()
  
  localforage.getItem(teamKey+'score', function (err, total) {
    if (err) throw new Error('Boo can\'t recover score')
    var newScore = parseInt(total) - parseInt(score)
    localforage.setItem(teamKey+'score', newScore, cb)
  })
}
