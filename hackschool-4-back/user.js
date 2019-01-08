const express = require('express');
const router = express.Router();

const users = new Map(); //object like a dictionary, mapping from one value to another, representing a collection of key-value pairs, faster for data storage

router.post('/', (req, res) => { //POST localhost:3000/user {"name" : "Bill"}
	const body = req.body;
	if (users.has(body.name)) {
		res.status(400); //Bad request
		res.json({ message: 'User already exists' });
		return;
	}

	users.set(body.name, { name: body.name });
	res.status(201); //Created
	res.json({ message: 'User created' });
});

router.get('/:user', (req, res) => { //GET localhost:3000/user/Bill
	const user = users.get(req.params.user);
	if (user !== undefined) {
		res.json(user);
	} else {
		res.status(404); //Gives user 404 Not Found error
		res.json({ message: 'User not found' });
	}
});

module.exports = router;

