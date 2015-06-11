var test = require('tape')
var async = require('async')
var scoreBoard = require('../src/score-board')

test('The scoreBoard holds two scores', function (t) {
  t.plan(3)

  async.waterfall([
    function resetScoreBoard (cb) {
      scoreBoard.reset(cb)  
    },
    function getTeam1Score (cb) {
      scoreBoard.team1.get(function (err, result) {
        t.equal(result, 0, 'the score for team1 starts at 0')
        cb()
      })
    },
    function getTeam2Score (cb) {
      scoreBoard.team2.get(function (err, result) {
        t.equal(result, 0, 'and same for team2')
        cb()
      })     
    }
  ], function (err) {
    t.ifError(err, 'no errors on init')
    t.end()
  })
})
test('Should be able to add to the score', function (t) {
  t.plan(2)
  scoreBoard.team1.add(10, function (err, result) {
    t.ifError(err, 'no error adding')
    t.equal(result, 10, 'adds value ok')
    t.end()
  })
})
test('Should be able to increment the score', function (t) {
  t.plan(1)
  scoreBoard.team1.add(10)
  scoreBoard.team1.add(10, function (err, result) {
    t.equal(result, 20, '10 + 10 is 20')
    t.end()
  })
})
test('Should be able to deduct from the score', function (t) {
  t.plan(3)
  async.waterfall([
    function resetScoreBoard (cb) {
      scoreBoard.reset(cb)
    },
    function addScore (cb) {
      scoreBoard.team1.add(100, cb)
    },
    function assertValue (result, cb) {
      t.equal(result, 100, 'score at 100')
      scoreBoard.team1.deduct(99, cb)
    },
    function assertNewValue (result, cb) {
      t.equal(result, 1, 'deduct 99 score now 1')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no errors deducting')
    t.end()
  })
})
test('Should be able to create a negative score', function (t) {
  t.plan(3)
  async.waterfall([
    function resetScoreBoard (cb) {
      scoreBoard.reset(cb)
    },
    function addScore (cb) {
      scoreBoard.team1.add(10, cb)
    },
    function assertValue (result, cb) {
      t.equal(result, 10, 'score at 10')
      scoreBoard.team1.deduct(20, cb)
    },
    function assertNewValue (result, cb) {
      t.equal(result, -10, 'deduct 20 score now -10')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no errors deducting')
    t.end()
  })
})