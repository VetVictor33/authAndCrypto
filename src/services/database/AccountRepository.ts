import TokenUtils from "../../utils/TokenUtils";
import Encryptation from "../cryptography/Encryptation";
import db from "./connection";

export default abstract class AccountRepository {
    static async signup(name: string, email: string, password: string) {
        const hashedPassword = await Encryptation.encrypt(password);
        await db("users").insert({ name, email, password: hashedPassword });
        return
    }

    static async signin(email: string, password: string) {
        const userFromDb = await db("users").where({ email }).first();
        if (!userFromDb) return false

        const { password: hash, ...user } = userFromDb;
        const isPasswordCorrect = await Encryptation.check(password, hash);
        if (!isPasswordCorrect) return false

        const token = TokenUtils.getToken(+user.id);

        return { token, user }
    }
}