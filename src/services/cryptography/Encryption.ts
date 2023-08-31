import bcrypt from 'bcrypt';
import UnauthorizedError from '../../errors/UnauthorizedError';
import { failedToLogIn } from '../../utils/MessageUtils';
export default abstract class Encryption {
    private static saltRounds = 10;

    static async encrypt(password: string): Promise<string> {
        const encryptedPassword = await bcrypt.hash(password, this.saltRounds);
        return encryptedPassword
    }

    static async check(password: string, hash: string): Promise<void> {
        const response = await bcrypt.compare(password, hash);
        if (!response) throw new UnauthorizedError(failedToLogIn)
    }
}