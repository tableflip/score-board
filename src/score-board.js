var localforage = require('localforage')
var _ = require('underscore')

var ScoreBoard = function (initTeams, cb) {
  if(_.uniq(initTeams).length !== initTeams.length) throw new Error('team names must be unique')
  var self = this
  self.reset = function (cb) {localforage.clear(cb)}
  self.teams = initTeams.slice()
  init.call(self, initTeams, cb)
}

function init (teams, cb) {
  var self = this
  if (teams.length === 0) {
    return cb(null, self)
  }
  var team = teams.pop()
  self[team] = new Interface(team)
  init.call(self, teams, cb)
}

module.exports = ScoreBoard

function Interface (team) {
  this.team = function () {
    return team
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
Interface.prototype.addPlayer = function (role, name, cb) {
  var teamKey = this.team()
  this[role] = function (cb) {
    localforage.getItem(teamKey+'players', function (err, players) {
      if (err) throw new Error(err)
      if (!players) {
        var players = []
        storeNewPlayer(teamKey, players, role, name, cb)
      }else{
        updatePlayer(teamKey, players, role, name, cb)
      }
    })
  }
  cb(null, name)
}

function Player (role, name) {
  return this[role] = name
}

function storeNewPlayer (teamKey, players, role, name, cb) {
  players.push(new Player(role, name))
  storePlayer(teamKey, players, role, cb)
}
function updatePlayer (teamKey, players, role, name, cb) {
  var index = _.findIndex(players, function (player) { return _.keys(player)[0] == role })
  players[index] = new Player(role, name)
  storePlayer(teamKey, players, role, cb)
}
function storePlayer (teamKey, players, role, cb) {
  localforage.setItem(teamKey+'players', players, function (err, players) {
    var player = _.chain(players).pluck(role).first().value()
    cb(null, player)    
  })
}
