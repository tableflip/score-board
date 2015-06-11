var localforage = require('localforage')

module.exports = function (localforage) {
  //init
  localforage.getItem('team1', function (err, result) {
    if (err) throw new Error(err)
    if (!result || result > 0) {
      ['team1', 'team2'].forEach(function (key) {
        localforage.setItem(key, 0)
      })
    }
  })
  //return interface
  return {
    team1: createInterface('team1'),
    team2: createInterface('team2'),
    reset: function (cb) {
      resetToZero(['team1', 'team2'], cb)
    }
  }
}(localforage)

function resetToZero (keys, cb) {
  if (!Array.isArray(keys)) throw new Error('Must be an array')
  keys.forEach(function (key) {
    localforage.setItem(key, 0)
  })
  cb() 
}

function createInterface (key) {
  return {
    get: function (cb) {
      localforage.getItem(key, cb)
    },
    add: function (value, cb) {
      localforage.getItem(key, function (err, result) {
        localforage.setItem(key, value+result, cb)
      })
    },
    deduct: function (value, cb) {
      localforage.getItem(key, function (err, result) {
        localforage.setItem(key, result-value, cb)
      })
    }
  }
}
