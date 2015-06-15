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
ScoreBoard.prototype.getTeams = function (cb) {
  localforage.getItem('scoreboardteams', function (err, teams) {
    if (err) return cb(err)
    cb(null, teams || [])
  })
}

function init (teams, cb) {
  var self = this
  teams.forEach(function (teamName) {
    self[teamName] = new Team(teamName)
  })
  localforage.setItem('scoreboardteams', teams, function (err) {
    if (err) return cb(err)
    cb(null, self)
  })
}

module.exports = ScoreBoard

function Team (team) {
  this.name = team
}
Team.prototype.getPlayers = function (cb) {
  localforage.getItem(this.name+'players', function (err, players) {
    if (err) return cb(err)
    cb(null, players || [])
  })
}
Team.prototype.setPlayers = function (players, cb) {
  localforage.setItem(this.name+'players', players, cb)
}
Team.prototype.getScore = function (cb) {
  localforage.getItem(this.name + 'score', function (err, score) {
    if (err) return cb(err)
    cb(null, score || 0)
  })
}
Team.prototype.addScore = function (score, cb) {
  localforage.getItem(this.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total + parseInt(score)
    localforage.setItem(this.name + 'score', newScore, cb)
  }.bind(this))
}
Team.prototype.getBonus = function (cb) {
  localforage.getItem(this.name + 'bonus', function (err, bonus) {
    if (err) return cb(err)
    cb(null, bonus || 0)
  })
}
Team.prototype.addBonus = function (bonus, cb) {
  localforage.getItem(this.name + 'bonus', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newBonus = total + parseInt(bonus)
    localforage.setItem(this.name + 'bonus', newBonus, cb)
  }.bind(this))
}
Team.prototype.deductBonus = function (bonus, cb) {
  localforage.getItem(this.name + 'bonus', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newBonus = total - parseInt(bonus)
    localforage.setItem(this.name + 'bonus', newBonus, cb)
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
Team.prototype.getTotal = function (cb) {
  var self = this
  this.getScore(function (err, score) {
    if (err) return cb(err)
    self.getBonus(function (err, bonus) {
      if (err) return cb(err)
      cb(null, score+bonus)
    })
  })
}
