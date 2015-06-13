#Score Board
Use this module by cloning the repo
```
git clone git@github.com:tableflip/score-board.git
```
or
```
npm install git://github.com/tableflip/score-board.git
```
Don't forget to
```
npm install
```
This module is a generic score board for your browser. Initiate with team names in an array.
```js
var ScoreBoard = require('score-board')
var scoreBoard = new ScoreBoard(['sharks', 'jets'])
```
Teams are created with a score of 0 you can increment and deduct values asynchronously which looks like this.
```js
scoreBoard.sharks.addScore(9, cb)
```
This will add 9 points to the shark's score. When it's done your callback function will be executed. Callback functions follow the node callback signiture below. You don't have to pass a callback in if you don't want to.
```js
function (err, result) {
  if (err) throw new Error(err)
  doStuffWithResult(here)
}
```
Here is v1.1.0 interface
```js
scoreBoard.sharks.addScore(9, cb) // returns 9 as the second argument of a callback 
scoreBoard.sharks.getScore(cb) // returns 9 as the second argument of a callback
scoreBoard.sharks.deduct(3, cb) // returns 6 as the second argument of a callback
scoreBoard.sharks.addPlayer('role','player', cb) // adds the player i.e {role: player}
scoreBoard.sharks.players.player1(cb) // returns the name of player1 - player1 is the 'role'
```
Uses tape in the browser for tests. To run the tests type `npm test` in the root of the project.
![tape tests](https://s3-eu-west-1.amazonaws.com/bmordantagbang/Screen+Shot+2015-06-13+at+15.40.31.jpg?X-Amz-Date=20150613T144302Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=8924f929a4b6294d0aed0a63b59ea0d1adac82e1cdd459b99037629f57e2e04b&X-Amz-Credential=ASIAJUV42PIJ426NK73Q/20150613/eu-west-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEMD//////////wEagAJlFaG9XdBOXIZAdTMUGC2oXoznVbxLWhPrZYGIxV%2Bu7Bvj4M/HDWN0h1vTWdm%2BLJpsWm8gV4JhAJgfdUNbFtsrN48B9OS4Ua4CkFqer2IeY9PL2FaxaXP/JB3A/dyvNXPV5oTK8qGBgJCYgB38hqP4OLlI5jYjywBFKmlIrxumM6TElBtcheFUUvAOICWP0FMsFiTqMNG1auV2H5kVz6op55qn0%2BMEOGg1IDugPVMkGJnrDsrRLT%2BrmGpasBzqr76GaEV25giV3RicHr9psmkaJb/6IRNLmUW84KxAgnnsH0lkvVIK8FreaSNJrvYyZdV2g22tsj5KAQoYQuGJ4/IkIJKC8asF)
