const express = require('express');
const router = express.Router();

const posts = new Map(); //object like a dictionary, mapping from ine value to another, representing a collection of key-value pairs, faster for data storage

router.post('/:user', (req, res) => { //POST localhost:3000/post/Bill { "name" : "Joe" }
	const body = req.body;
	const key = req.params.user + '/' + body.name;

	if (posts.has(key)) {
		res.status(400); //Bad request
		res.json({ message: 'Post already exists'});
		return;
	}

	posts.set(key, { 
		name: body.name,
		content: body.content 
	});
	res.status(201); //Created
	res.json({ message: 'Post created' });
});

router.get('/:user/:post', (req, res) => { //GET localhost:3000/post/Bill/Joe
	const postObj = posts.get(req.params.user + '/' + req.params.post);
	if (postObj !== undefined) {
		res.json(postObj);
	} else {
		res.status(404); //Gives user 404 Not Found error
		res.json({ message: 'Post not found' });
	}
});

module.exports = router;

