var localforage = require('localforage')

module.exports = function (localforage) {
  //return interface
  return {
    addTeams: function (teams, cb) {
      this.keys = teams
      for(i in teams){
        this[teams[i]] = createInterface(teams[i])
        localforage.setItem(teams[i], 0)
        if (parseInt(i)+1 === teams.length) cb(null, teams)
      }
    },
    reset: function (cb) {
      resetToZero(this.teams, cb)
    },
    teams: []
  }
}(localforage)

function resetToZero (keys, cb) {
  keys.forEach(function (key, index) {
    if (index+1 === keys.length) {
      localforage.setItem(key, 0)
    }else{
      localforage.setItem(key, 0)
    }
  })
  cb(null, keys)
}

function createInterface (key) {
  return {
    name: key,
    get: function (cb) {
      localforage.getItem(key, cb)
    },
    add: function (value, cb) {
      localforage.getItem(key, function (err, result) {
        if (err) throw new Error(err)
        localforage.setItem(key, parseInt(value)+parseInt(result), cb)
      })
    },
    deduct: function (value, cb) {
      localforage.getItem(key, function (err, result) {
        if (err) throw new Error(err)
        localforage.setItem(key, parseInt(result)-parseInt(value), cb)
      })
    },
    addplayer1: function (player, cb) {
      localforage.setItem(key+'player1', player, cb)
    },
    addplayer2: function (player, cb) {
      localforage.setItem(key+'player2', player, cb)
    },
    players: function (cb) {
      localforage.getItem(key+'players1', function (err, result) {
        cb(null, result.split(','))
      })
    }
  }
}
