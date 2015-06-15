function Team (team, localforage) {
  this.name = team
  this._localforage = localforage
}
Team.prototype.getPlayers = function (cb) {
  this._localforage.getItem(this.name+'players', function (err, players) {
    if (err) return cb(err)
    cb(null, players || [])
  })
}
Team.prototype.setPlayers = function (players, cb) {
  this._localforage.setItem(this.name+'players', players, cb)
}
Team.prototype.getScore = function (cb) {
  this._localforage.getItem(this.name + 'score', function (err, score) {
    if (err) return cb(err)
    cb(null, score || 0)
  })
}
Team.prototype.addScore = function (score, cb) {

  this._localforage.getItem(this.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total + parseInt(score)
    this._localforage.setItem(this.name + 'score', newScore, function (err, score) {
      if (err) return cb(err)
    })
  }.bind(this))
}
Team.prototype.deductScore = function (score, cb) {
  this._localforage.getItem(this.name + 'score', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newScore = total - parseInt(score)
    this._localforage.setItem(this.name + 'score', newScore, cb)
  }.bind(this))
}
Team.prototype.getBonus = function (cb) {
  this._localforage.getItem(this.name + 'bonus', function (err, bonus) {
    if (err) return cb(err)
    cb(null, bonus || 0)
  })
}
Team.prototype.addBonus = function (bonus, cb) {
  this._localforage.getItem(this.name + 'bonus', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newBonus = total + parseInt(bonus)
    this._localforage.setItem(this.name + 'bonus', newBonus, cb)
  }.bind(this))
}
Team.prototype.deductBonus = function (bonus, cb) {
  this._localforage.getItem(this.name + 'bonus', function (err, total) {
    if (err) return cb(err)
    total = total || 0
    var newBonus = total - parseInt(bonus)
    this._localforage.setItem(this.name + 'bonus', newBonus, cb)
  }.bind(this))
}

module.exports = Team