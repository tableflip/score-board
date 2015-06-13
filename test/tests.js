var test = require('tape')
var async = require('async')
var ScoreBoard = require('../src/score-board')

test('A new team starts with a score of 0', function (t) {
  t.plan(2)
  var scoreBoard
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['test'], cb)
    },
    function getScore (teams, cb) {
      scoreBoard.test.getScore(cb)
    },
    function assertOnScore (score, cb) {
      t.equals(score, 0, 'score is 0')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no error')
    t.end()
  })
})
test('You can add a score to the scoreBoard', function (t) {
  t.plan(2)
  var scoreBoard
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['test'], cb)
    },
    function addScore (teams, cb) {
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
test('The scoreBoard holds two scores', function (t) {
  t.plan(4)
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['team1','team2'], cb)
    },
    function addScore (teams, cb) {
      t.equal(teams.length, 2, 'returns team names on init')
      scoreBoard.team1.addScore(1)
      scoreBoard.team2.addScore(2, cb)
    },
    function getScores (team2score, cb) {
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
test('Should be able to deduct from the score', function (t) {
  t.plan(3)
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
test('The score increments', function (t) {
  t.plan(3)
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
test('You can add a player', function (t) {
  t.plan(2)
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['test'], cb)
    },
    function addPlayer (teams, cb) {
      scoreBoard.test.addPlayer('player1', 'testname', cb)
    },
    function getPlayers (player, cb) {
      t.ok(player, 'returns the player')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no errors')
    t.end()
  })
})
test('You can retrieve players', function (t) {
  t.plan(2)
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['test'], cb)
    },
    function addPlayer (teams, cb) {
      scoreBoard.test.addPlayer('player1', 'testname', cb)
    },
    function getPlayer (player, cb) {
      scoreBoard.test.players.player1(cb)
    },
    function assert (player, cb) {
      t.equals(player, 'testname', 'Stores testname under player1')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no errors')
    t.end()
  })
})
test('You can add many players', function (t) {
  t.plan(3)
  async.waterfall([
    function initScoreBoard (cb) {
      scoreBoard = new ScoreBoard(['test'], cb)
    },
    function addPlayer (teams, cb) {
      scoreBoard.test.addPlayer('player1', 'testname1', cb)
    },
    function addAnother (player, cb) {
      scoreBoard.test.addPlayer('player2', 'testname2', cb)
    },
    function getPlayers (player, cb) {
      var players = Object.keys(scoreBoard.test.players)
      t.equals(players.length, 2, 'two endpoints are created')
      t.equals(typeof scoreBoard.test.players.player1, 'function', 'the endpoints are functions')
      cb()
    }
  ], function (err) {
    t.ifError(err, 'no errors')
    t.end()
  })
})
