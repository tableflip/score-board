var localforage = require('localforage')
var _ = require('underscore')

var ScoreBoard = function (initTeams, cb) {
  var self = this
  if(_.uniq(initTeams).length !== initTeams.length) throw new Error('team names must be unique')
  if(!initTeams) {
    this.getTeams(function (err, teams) {
      if (err) return cb(err)
      if (!teams) return cb(new Error('No teams passed and no teams in storeage'))
      init.call(self, teams, cb) 
    })
  }else{
    this.teams = initTeams.slice()
    init.call(this, initTeams, cb)
  }
}
ScoreBoard.prototype.reset = function (cb) {
  localforage.clear(cb)
}
ScoreBoard.prototype.getTeams = function (cb) {
  localforage.getItem('scoreboardteams', cb)
}

function init (teams, cb) {
  var self = this
  if (teams.length === 0) {
    return cb(null, self)
  }
  var team = teams.pop()
  self[team] = new Team(team)
  init.call(self, teams, cb)
}

module.exports = ScoreBoard

function Team (team) {
  this.name = team
}
Team.prototype.getPlayers = function (cb) {
  localforage.getItem(this.name+'players', cb)
}
Team.prototype.setPlayers = function (players, cb) {
  localforage.setItem(this.name+'players', players, cb)
}
Team.prototype.getScore = function (cb) {
  localforage.getItem(this.name + 'score', cb)
}
Team.prototype.addScore = function (score, cb) {
  localforage.getItem(this.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total + parseInt(score)
    localforage.setItem(this.name + 'score', newScore, cb)
  }.bind(this))
}
Team.prototype.deductScore = function (score, cb) {
  localforage.getItem(this.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total - parseInt(score)
    localforage.setItem(this.name + 'score', newScore, cb)
  }.bind(this))
}
