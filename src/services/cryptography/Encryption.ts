import bcrypt from 'bcrypt';
import UnauthorizedError from '../../errors/UnauthorizedError';
import { failedToLogIn } from '../../utils/MessageUtils';
export default abstract class Encryption {
    private static saltRounds = 10;

    static async hash(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        return hashedPassword
    }

    static async check(password: string, hash: string): Promise<void> {
        const isValid = await bcrypt.compare(password, hash);
        if (!isValid) throw new UnauthorizedError(failedToLogIn)
    }
}