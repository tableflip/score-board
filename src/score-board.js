var Team = require('./team')
var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

var ScoreBoard = function (initTeams, localforage, cb) {
  var self = this
  self._localforage = localforage

  if (!initTeams) {
    this.getTeams(function (err, teams) {
      if (err) return cb(err)
      if (!teams) return cb(new Error('No teams passed and no teams in storeage'))
      init.call(self, teams, cb) 
    })
  } else {
    this.teams = initTeams.slice()
    localforage.clear(function () {
      init.call(self, initTeams, cb)
    })
  }
}

inherits(ScoreBoard, EventEmitter)

ScoreBoard.prototype.getTeams = function (cb) {
  var self = this
  this._localforage.getItem('scoreboardteams', function (err, teams) {
    if (err) return cb(err)
    cb(null, teams || [])
  })
}

function init (teams, cb) {
  var self = this
  teams.forEach(function (teamName) {
    self[teamName] = new Team(teamName, self._localforage)
  })
  self._localforage.setItem('scoreboardteams', teams, function (err) {
    if (err) return cb(err)
    cb(null, self)
  })
}

module.exports = ScoreBoard
