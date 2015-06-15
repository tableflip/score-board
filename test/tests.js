var test = require('tape')
var async = require('async')
var ScoreBoard = require('../src/score-board')
var localforage = require('localforage')

test('A new scoreBoard has teams, and a reset function', function (t) {
  t.plan(4)
  var scoreBoard
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['team1','team2'], cb)
    },
    function testScoreBoard (scoreBoard, cb) {
      t.ok(scoreBoard.teams, 'scoreBoard created with teams array')
      t.equal(typeof scoreBoard.reset, 'function', 'scoreBoard created with reset function')
      t.equal(scoreBoard.teams[0], 'team1', 'the team names can be retrieved')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no error')
    t.end()
  })
})
test('a new interface is created for the teams passed on init', function (t) {
  t.plan(4)
  var scoreBoard
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['team1','team2'], cb)
      },
      function testInterface (scoreBoard, cb) {
        t.equal(typeof scoreBoard, 'object', '"new" returns the scoreBoard')
        t.ok(scoreBoard.team1, 'with end points')
        t.ok(scoreBoard.team2, 'for both teams')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors')
      t.end()
    })
  })
})
test('You can add a score to the scoreBoard', function (t) {
  t.plan(2)
  var scoreBoard
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function addScore (scoreBoard, cb) {
        scoreBoard.test.addScore(10, cb)
      },
      function assertOnScore (score, cb) {
        t.equals(score, 10, 'like a 10 letter word score')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors')
      t.end()
    })
  })
})
test('The scoreBoard holds two scores', function (t) {
  t.plan(5)
  var scoreBoard
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['team1','team2'], cb)
      },
      function addScoreTeam1 (scoreBoard, cb) {
        scoreBoard.team1.addScore(1, cb)
      },
      function addScoreTeam2 (team1score, cb) {
        t.equals(team1score, 1, 'returns score for team 1')
        scoreBoard.team2.addScore(2, cb)
      },
      function getScores (team2score, cb) {
        t.equals(team2score, 2, 'returns score for team 2')
        scoreBoard.team1.getScore(cb)
      },
      function assertTeam1Score (score, cb) {
        t.equal(score, 1, 'team 1 has a score of 1')
        scoreBoard.team2.getScore(cb)
      },
      function assertTeam2Score (score, cb) {
        t.equal(score, 2, 'team 2 has a score of 2')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors on getting scores')
      t.end()
    })
  })
})
test('Should be able to deduct from the score', function (t) {
  t.plan(3)
  localforage.clear(function (err, done){
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function addScore (teams, cb) {
        scoreBoard.test.addScore(2, cb)
      },
      function assertValue (score, cb) {
        t.equal(score, 2, 'score set at 2')
        scoreBoard.test.deduct(1, cb)
      },
      function assertNewValue (newScore, cb) {
        t.equal(newScore, 1, 'deduct 1 score now 1')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors deducting')
      t.end()
    }) 
  })
})
test('The score increments', function (t) {
  t.plan(3)
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function addScore (teams, cb) {
        scoreBoard.test.addScore(1, cb)
      },
      function addAgain (score, cb) {
        t.equals(score, 1, 'score at 1')
        scoreBoard.test.addScore(1, cb)
      },
      function getScore (score, cb) {
        scoreBoard.test.getScore(cb)
      },
      function assertValue (score, cb) {
        t.equal(score, 2, 'score now 2')
        cb()
      },
    ], function (err) {
      t.ifError(err, 'no errors')
      t.end()
    })
  })
})
test('The score persists across a refresh', function (t) {
  t.plan(3)
  var scoreBoard
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function addScore (scoreBoard, cb) {
        scoreBoard.test.addScore(100, cb)
      },
      function getScore (score, cb) {
        scoreBoard.test.getScore(cb)
      },
      function assertOnScore (score, cb) {
        t.equals(score, 100, 'score set at 100')
        cb()
      },
      function setSetScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function checkScore (scoreBoard, cb) {
        scoreBoard.test.getScore(cb)
      },
      function assertOnScoreAgain (score, cb) {
        t.equal(score, 100, 'score persists')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors')
      t.end()
    })
  })
})
test('You can add and get a player', function (t) {
  t.plan(3)
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function addPlayer (teams, cb) {
        scoreBoard.test.addPlayer('player1', 'testname', cb)
      },
      function getPlayers (player, cb) {
        t.ok(player, 'returns the player')
        scoreBoard.test.player1(cb)
      },
      function (player, cb) {
        t.equals(player, 'testname', 'player added ok')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors')
      t.end()
    })
  })
})
test('You can "update" a player', function (t) {
  t.plan(4)
  localforage.clear(function (err, done) {
    async.waterfall([
      function initScoreBoard (cb) {
        scoreBoard = new ScoreBoard(['test'], cb)
      },
      function addPlayer (teams, cb) {
        scoreBoard.test.addPlayer('player1', 'testname', cb)
      },
      function getPlayer (player, cb) {
        scoreBoard.test.player1(cb)
      },
      function updatePlayer (player, cb) {
        t.equals(player, 'testname', 'player added ok')
        scoreBoard.test.addPlayer('player1', 'updated-testname', cb)
      },
      function getPlayerAgain (player, cb) {
        t.equals(player, 'updated-testname', 'player updated name returned ok')
        scoreBoard.test.player1(cb)
      },
      function assert (player, cb) {
        t.equals(player, 'updated-testname', 'update stored ok')
        cb()
      }
    ], function (err) {
      t.ifError(err, 'no errors')
      t.end()
    })
  })
})
test('Team names must be unique', function (t) {
  t.plan(1)
  t.throws(function () {
    var scoreBoard = new ScoreBoard(['test', 'test'], cb)
  })
  t.end()
})

