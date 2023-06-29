import jwt from 'jsonwebtoken';

export default abstract class TokenUtils {

    private static expiresIn = '8h';

    public static getToken(userId: number): string {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: this.expiresIn })
    }

    public static validateToken(token: string): jwt.ModJwtPayload {
        return jwt.verify(token, process.env.JWT_SECRET!) as jwt.ModJwtPayload
    }
}