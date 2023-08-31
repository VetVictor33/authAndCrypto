import { Router } from 'express';
import MonsterController from './controllers/MonsterController';
import MonsterValidation from './middlewares/MonsterValidation';
import AccountController from './controllers/AccountController';
import TokenValidation from './middlewares/TokenValidation';
import schemaValidation from './middlewares/schemaValidation';
import { accountLoginSchema, accountSignupSchema, monsterCreationSchema } from './schemas/Schemas';
export default abstract class Routes {
  private static router: Router = Router()

  private static monsterValidation: MonsterValidation = new MonsterValidation()
  private static tokenValidation: TokenValidation = new TokenValidation()

  private static accountController: AccountController = new AccountController()
  private static monsterController: MonsterController = new MonsterController()

  public static routes() {
    this.router.get('/', (req, res) => { res.json('Server is up and running') });

    this.router.post('/signup', schemaValidation(accountSignupSchema), this.accountController.signup);
    this.router.post('/signin', schemaValidation(accountLoginSchema), this.accountController.sigin);

    this.router.use(this.tokenValidation.validate);

    this.router.post('/monsters', schemaValidation(monsterCreationSchema), this.monsterController.post);
    this.router.get('/monsters', this.monsterController.get);
    this.router.get('/monsters/:monsterId', this.monsterController.get);
    this.router.patch('/monsters/:monsterId/:field', this.monsterValidation.update, this.monsterController.patch);
    this.router.delete('/monsters/:monsterId', this.monsterController.delete)
    return this.router
  }
}