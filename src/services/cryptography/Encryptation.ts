import bcrypt from 'bcrypt';
export default abstract class Encryptation {
    private static saltRounds = 10;

    static async encrypt(password: string): Promise<string> {
        const encryptedPassword = await bcrypt.hash(password, this.saltRounds);
        return encryptedPassword
    }

    static async check(password: string, hash: string): Promise<boolean> {
        const response = await bcrypt.compare(password, hash);
        return response
    }
}