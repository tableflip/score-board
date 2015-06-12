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
scoreBoard.addTeams(['sharks']) // set up a team
scoreBoard.sharks.add(9, cb) // returns 9 as the second argument of a callback 
scoreBoard.sharks.get(cb) // returns 9 as the second argument of a callback
scoreBoard.sharks.deduct(3, cb) // returns 6 as the second argument of a callback
scoreBoard.sharks.addplayer('string', cb) // adds the player to the team returns all the players
scoreBoard.sharks.players(cb) // returns an array of players in 2nd arg of callback
scoreBoard.reset(cb) // all the teams you added? they now have a score of 0 and the players are gone.
```
Uses tape in the browser for tests. To run the tests type `npm test` in the root of the project.
![tape tests](https://s3-eu-west-1.amazonaws.com/bmordantagbang/Screen+Shot+2015-06-12+at+13.17.08.jpg?X-Amz-Date=20150612T121836Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=2e9308cf79a5d56df70614a0fe2bd88d3684940d441bc499e1fc33786c3b7582&X-Amz-Credential=ASIAI34XME7HHJSLOAJA/20150612/eu-west-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEKX//////////wEagAIW0%2BvSdzEnA9De/vZYOiaJMjOmfLHI5SO80WExac%2Bk4JtyAOOakxykVVxmrgExQkG6MiVXR6f6xA%2BQjrhy2Aq1g1Um5JjF3zgkCUqjYj02EkHCAwUr8BVBlUdkKRF/1rkERvWPB7KLJcBjBVSuQrfcnBECHz%2BlEbUYcO9LL2TsEt%2BNyNiAMOC7RR71sttHhxD51ce7IFr7zuq1tTExT//rgG36OXm5ITU6dzwJyLAOozeqkAWtg2hHlRsHH5nwnDoJsMFVgMRcyP04o5683aaFKZxaegpXAnLZFEXkN%2BL47R7nSXcwRlugLh9jOKwYKCQ3IGiXUCAElD5/7Ku3E6gpIPab66sF)
