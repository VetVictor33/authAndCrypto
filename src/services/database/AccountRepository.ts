import { AppDataSource } from "../../data-source";
import User from "../../entities/User";
import UnauthorizedError from "../../errors/UnauthorizedError";
import { failedToLogIn } from "../../utils/MessageUtils";
import TokenUtils from "../../utils/TokenUtils";
import Encryption from "../cryptography/Encryption";

type LoginCredential = Omit<User, 'id'>
type SignInCredential = Omit<User, 'id' | 'name'>

export default abstract class AccountRepository {
    private static userRepository = AppDataSource.getRepository(User)

    static async signup(credentials: LoginCredential) {
        const { name, email, password } = credentials
        const hashedPassword = await Encryption.encrypt(password);
        const newUser = this.userRepository.create({ name, email, password: hashedPassword })
        await this.userRepository.save(newUser)
        return newUser
    }

    static async signIn(credentials: SignInCredential) {
        const { email, password } = credentials
        const userFromDb = await this.userRepository.findOneBy({ email })
        if (!userFromDb) throw new UnauthorizedError(failedToLogIn)

        const { password: hash, ...user } = userFromDb;

        await Encryption.check(password, hash);

        const token = TokenUtils.getToken(+user.id);

        return { token, user }
    }
}