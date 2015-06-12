var localforage = require('localforage')

module.exports = function (localforage) {
  //init
  
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
      localforage.setItem(key, 0, cb)
    }else{
      localforage.setItem(key, 0)
    }
  }) 
}

function createInterface (key) {
  return {
    get: function (cb) {
      localforage.getItem(key, cb)
    },
    add: function (value, cb) {
      localforage.getItem(key, function (err, result) {
        localforage.setItem(key, parseInt(value)+parseInt(result), cb)
      })
    },
    deduct: function (value, cb) {
      localforage.getItem(key, function (err, result) {
        localforage.setItem(key, parseInt(result)-parseInt(value), cb)
      })
    }
  }
}
