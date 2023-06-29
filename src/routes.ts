import express from 'express';
import MonsterController from './controllers/MonsterController';
import MonsterValidation from './middlewares/MonsterValidation';
import AccountValidation from './middlewares/AccountValidation';
import AccountController from './controllers/AccountController';
import TokenValidation from './middlewares/TokenValidation';
const router = express();

router.get('/', (req, res) => { res.json('Server is up and running') });

router.post('/signup', new AccountValidation().signup as any, new AccountController().signup as any);
router.post('/signin', new AccountValidation().signin as any, new AccountController().sigin as any);

router.use(new TokenValidation().validate as any);

router.post('/monster', new MonsterValidation().creation as any, new MonsterController().post as any);
router.get('/monsters', new MonsterController().get as any);
router.get('/monsters/:monsterId', new MonsterController().get as any);
router.patch('/monster/:monsterId/:field', new MonsterValidation().update as any, new MonsterController().patch as any);
router.delete('/monster/:monsterId', new MonsterController().delete as any)

export default router
