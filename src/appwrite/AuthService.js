import { Client, Account, ID } from "appwrite";
import getAppWriteClient from "./Client";

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
        return this.account.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  async logout() {
    try {
      this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();

export default authService;
