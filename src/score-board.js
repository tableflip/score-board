var localforage = require('localforage')

module.exports = function (localforage) {
  //return interface
  return {
    addTeams: function (array, cb) {
      this.keys = array
      for(i in array){
        this[array[i]] = createInterface(array[i])
        if (parseInt(i)+1 === array.length) this.reset(cb)
      }
    },
    reset: function (cb) {
      resetToZero(this.keys, cb)
    },
    keys: []
  }
}(localforage)

function resetToZero (keys, cb) {
  if (!Array.isArray(keys)) throw new Error('Must be an array')
  keys.forEach(function (key, index) {
    if (index+1 === keys.length) {
      localforage.setItem(key, 0)
      localforage.setItem(key+'players', null, cb)
    }else{
      localforage.setItem(key, 0)
      localforage.setItem(key+'players', null)
    }
  }) 
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
    addplayer: function (player, cb) {
      localforage.getItem(key+'players', function (err, players) {
        if (err) throw new Error(err)
        var update = concatPlayers(players, player)
        localforage.setItem(key+'players', update, function (err, result) {
          cb(null, result.split(','))
        })
      })
    },
    players: function (cb) {
      localforage.getItem(key+'players', function (err, result) {
        cb(null, result.split(','))
      })
    }
  }
}
function concatPlayers (players, player) {
  if (players === null) {
    var update = player
  }else{
    var update = players + ',' + player
  }
  return update
}
