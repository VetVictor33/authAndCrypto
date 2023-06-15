const express = require('express');
const { postUser, postSignin } = require('./controllers/users.controller');
const { signupVaidation, signinValidation } = require('./middlewares/userDataValidation');
const { tokenValidation } = require('./middlewares/tokenValidation');
const { getMonster, postMonster, patchMonster, deleteMonster } = require('./controllers/monster.controller');
const { monsterDataValidation } = require('./middlewares/monsterDataValidation');
const { monsterPatchValidation } = require('./middlewares/validateMonsterPatch');
const router = express();

router.get('/', (req, res) => { res.json('Server is up and running') });

router.post('/signup', signupVaidation, postUser);
router.post('/signin', signinValidation, postSignin);

router.use(tokenValidation);

router.get('/monsters', getMonster);
router.get('/monsters/:monsterId', getMonster);
router.post('/monster', monsterDataValidation, postMonster);
router.patch('/monster/:monsterId/:field', monsterPatchValidation, patchMonster);
router.delete('/monster/:monsterId', deleteMonster)

module.exports = router
