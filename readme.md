# Score Board
This module is a generic score board for your browser.

Use this module by cloning the repo

```sh
git clone git@github.com:tableflip/score-board.git
```

or

```sh
npm install git://github.com/tableflip/score-board.git
```

Don't forget to

```sh
npm install
```

## Usage

Initiate with team names in an array:

```js
var ScoreBoard = require('score-board')
var scoreBoard = new ScoreBoard(['sharks', 'jets'], localforage, cb)
```

The ScoreBoard requires a [localforage](https://github.com/mozilla/localForage) or localforage like object for persisting scores.

Teams are created with a score of 0 you can increment and deduct values asynchronously which looks like this:

```js
scoreBoard.sharks.addScore(9, cb)
```

This will add 9 points to the shark's score. When it's done your callback function will be executed. Callback functions follow the node callback signiture below. You don't have to pass a callback in if you don't want to.

```js
function (err, result) {
  if (err) throw err
  doStuffWithResult(result)
}
```

### Restoring teams and scores

If you create a `ScoreBoard` passing `null` for team names, it'll attempt to reinstate existing teams from storage:

```js
var ScoreBoard = require('score-board')

new ScoreBoard(null, localforage, function (err, scoreBoard) {
  if (err) return console.error('No teams in storage')
  scoreBoard.getTeams(function (err, teams) {
    console.log(teams)
  })
})
```

## API

```js
scoreBoard.getTeams(cb) // callback with ['sharks', 'jets']

// Main score
scoreBoard.sharks.addScore(9, cb) // callback with 9
scoreBoard.sharks.getScore(cb) // callback with 9
scoreBoard.sharks.setScore(10, cb) // callback with 10
scoreBoard.sharks.deductScore(3, cb) // callback with 7

// Bonus points
scoreBoard.sharks.addBonus(9, cb) // callback with 9
scoreBoard.sharks.getBonus(cb) // callback with 9
scoreBoard.sharks.setBonus(10, cb) // callback with 10
scoreBoard.sharks.deductBonus(3, cb) // callback with 7

// Total (score + bonus)
scoreBoard.sharks.getTotal(cb) // callback with 14
```

## Events

### Team

Team objects emit the following events:

* score:add
* score:deduct
* score:set
* bonus:add
* bonus:deduct
* bonus:set

Uses tape in the browser for tests. To run the tests type `npm test` in the root of the project.

---

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.
