var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

function Team (team, localforage) {
  this.name = team
  this._localforage = localforage
}

inherits(Team, EventEmitter)

Team.prototype.getPlayers = function (cb) {
  this._localforage.getItem(this.name+'players', function (err, players) {
    if (err) return cb(err)
    cb(null, players || [])
  })
}
Team.prototype.setPlayers = function (players, cb) {
  this._localforage.setItem(this.name+'players', players, function (err) {
    if (err) return cb(err)
    cb(null, players)
  })
}
Team.prototype.getScore = function (cb) {
  this._localforage.getItem(this.name + 'score', function (err, score) {
    if (err) return cb(err)
    cb(null, score || 0)
  })
}
Team.prototype.setScore = function (score, cb) {
  var self = this

  self._localforage.setItem(self.name + 'score', score, function (err) {
    if (err) return cb(err)
    self.emit('score:set', score)
    cb(null, score)
  })
}
Team.prototype.addScore = function (score, cb) {
  var self = this

  self._localforage.getItem(self.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total + parseInt(score)
    self._localforage.setItem(self.name + 'score', newScore, function (err) {
      if (err) return cb(err)
      self.emit('score:add', newScore)
      cb(null, newScore)
    })
  })
}
Team.prototype.deductScore = function (score, cb) {

  var self = this

  self._localforage.getItem(self.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total - parseInt(score)
    self._localforage.setItem(self.name + 'score', newScore, function (err) {
      if (err) return cb(err)
      self.emit('score:deduct', newScore)
      cb(null, newScore)
    })
  })
}
Team.prototype.getBonus = function (cb) {
  this._localforage.getItem(this.name + 'bonus', function (err, bonus) {
    if (err) return cb(err)
    cb(null, bonus || 0)
  })
}
Team.prototype.setBonus = function (bonus, cb) {
  var self = this

  self._localforage.setItem(self.name + 'bonus', bonus, function (err) {
    if (err) return cb(err)
    self.emit('bonus:set', bonus)
    cb(null, bonus)
  })
}
Team.prototype.addBonus = function (bonus, cb) {
  var self = this

  self._localforage.getItem(self.name + 'bonus', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newBonus = total + parseInt(bonus)
    self._localforage.setItem(self.name + 'bonus', newBonus, function (err) {
      if (err) return cb(err)
      self.emit('bonus:add', newBonus)
      cb(null, newBonus)
    })
  })
}
Team.prototype.deductBonus = function (bonus, cb) {
  var self = this

  self._localforage.getItem(self.name + 'bonus', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newBonus = total - parseInt(bonus)
    self._localforage.setItem(self.name + 'bonus', newBonus, function (err) {
      if (err) return cb(err)
      self.emit('bonus:deduct', newBonus)
      cb(null, newBonus)
    })
  })
}
Team.prototype.getTotal = function (cb) {
  var self = this
  self.getScore(function (err, score) {
    if (err) return cb(err)
    self.getBonus(function (err, bonus) {
      if (err) return cb(err)
      cb(null, score + bonus)
    })
  })
}

module.exports = Team