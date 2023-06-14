const express = require('express');
const { postUser } = require('./controllers/users.controller');
const signinVaidation = require('./middlewares/signinValidation');
const router = express();

router.get('/', (req, res) => { res.json('oi') });

router.post('/users', signinVaidation, postUser);

module.exports = router
