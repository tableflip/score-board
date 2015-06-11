#Score Board
Use this module by cloning the repo
```
git clone git@github.com:tableflip/score-board.git
```
or
```
npm install git://github.com/tableflip/score-board.git
```
This module wraps some handy function calls around localforage. The idea is you have a generic score board to which you add teams. Then you can update scores more succinctly like this.
```js
var scoreBoard = require('score-board')
scoreBoard.addTeams(['sharks','jets'])
```
Teams are created with a score of 0 you can increment and deduct values asynchronously which looks like this.
```js
scoreBoard.sharks.add(9, cb)
```
This will add 9 points to the shark's score. When it's done your callback function will be executed. Callback functions follow the node callback signiture below. You don't have to pass a callback in if you don't want to.
```js
function (err, result) {
  do stuff with result here
}
```
Here is v0.0.1 interface
```js
scoreBoard.sharks.add(9, cb) // returns 9 as the second argument of a callback 
scoreBoard.sharks.get(cb) returns 9 as the second argument of a callback
scoreBoard.sharks.deduct(3, cb) returns 6 as the second argument of a callback
```
Uses tape in the browser for tests. To run the tests type `npm test` in the root of the project.
