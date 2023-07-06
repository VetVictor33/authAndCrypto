import express, {Router} from 'express';
import MonsterController from './controllers/MonsterController';
import MonsterValidation from './middlewares/MonsterValidation';
import AccountValidation from './middlewares/AccountValidation';
import AccountController from './controllers/AccountController';
import TokenValidation from './middlewares/TokenValidation';
export default class Routes {
  public router: Router

  private accountValidation: AccountValidation = new AccountValidation()
  private monsterValidation: MonsterValidation = new MonsterValidation()
  private tokenValidation: TokenValidation = new TokenValidation()

  private accountController: AccountController = new AccountController()
  private monsterController: MonsterController = new MonsterController()
  
  constructor(){
    this.router = express()
    this.createRoutes()
  }
  
  private createRoutes() {
    this.router.get('/', (req, res) => { res.json('Server is up and running') });
    
    this.router.post('/signup', this.accountValidation.signup, this.accountController.signup);
    this.router.post('/signin', this.accountValidation.signin, this.accountController.sigin);
    
    this.router.use(this.tokenValidation.validate);
    
    this.router.post('/monster', this.monsterValidation.creation, this.monsterController.post);
    this.router.get('/monsters', this.monsterController.get);
    this.router.get('/monsters/:monsterId', this.monsterController.get);
    this.router.patch('/monster/:monsterId/:field', this.monsterValidation.update, this.monsterController.patch);
    this.router.delete('/monster/:monsterId', this.monsterController.delete)
  }
}