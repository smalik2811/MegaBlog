import getAppWriteClient from "./client";
import { Account, ID } from "appwrite";

export class AuthService {
    client;
    account;

    constructor() {
        this.client = getAppWriteClient();
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login({ email, password });
            }
        } catch (error) {
            console.log("AuthService :: createAccount ::", error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.log("AuthService :: login ::", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService :: getCurrentUser ::", error);
        }
    }

    async logout() {
        try {
            this.account.deleteSessions();
        } catch (error) {
            console.log("AuthService :: logout ::", error);
        }
    }
}

const authService = new AuthService();
export default authService;
