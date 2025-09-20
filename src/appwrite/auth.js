
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.apWriteUrl)
      .setProject(config.apWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      let userAccount=  await this.account.createEmailPasswordUser(
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
  try {
    return await this.account.createEmailPasswordSession(email, password);
  } catch (err) {
    console.error(`Login failed: ${err.message}`);
    throw err;
  }
}

async getCurrentUser(){
    try {
         return await this.account.get();
        
    } catch (error) {
         console.error(`Login failed: ${error.message}`);
    throw error;
        
    }
    return null;
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
