const math = require('./math.js'); //runs math.js, taking the value we set module.exports to, returning value as the return of the require() call
								   //constant variable math, object that now contains three properties in math.js
const express = require('express');
const userEndpoints = require('./routes/user.js');
const postEndpoints = require('./routes/post.js');

const app = express();								   

console.log(math.add(3, 4));
console.log(math.pi * math.square(5));

app.use(express.json());

app.use('/user', userEndpoints);
app.use('/post', postEndpoints);

app.listen(3000);

