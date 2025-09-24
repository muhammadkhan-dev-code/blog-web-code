
import { Account, Client, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      let userAccount=  await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if(userAccount){
     
       return this.login({email,password});
      }else{
        return userAccount;

      }
    } catch (err) {
      console.error(`Account creation failed: ${err.message}`);
      throw err;
    }
  }

 async login({ email, password }) {
  console.log('login');
  try {
    return await this.account.createEmailPasswordSession(email, password);
  } catch (err) {
    console.error(`Login failed: ${err.message}`);
    throw err;
  }
}

async getCurrentUser() {
  try {
    const user = await this.account.get();
    return user;
  } catch (error) {
    if (error.code === 401) {
      console.warn("No active session. User is a guest.");
      return null;
    }
    console.error(`getCurrentUser failed: ${error.message}`);
    throw error;
  }
}

async logout(){
    try {
        await this.account.deleteSessions();
    } catch (err) {
      console.log(`App write Service :: logout Error ,${err}`);
         
    }
}

}

const authService = new AuthService();
export default authService;
