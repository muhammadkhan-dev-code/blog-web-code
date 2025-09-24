// Test file to check Appwrite connection
import { Account, Client } from "appwrite";
import config from "../config/config.js";

const client = new Client();
const account = new Account(client);

client
  .setEndpoint(config.appWriteUrl)
  .setProject(config.appWriteProjectId);

// Test the connection
console.log('Testing Appwrite connection...');
console.log('Endpoint:', config.appWriteUrl);
console.log('Project ID:', config.appWriteProjectId);

// Check available methods on account
console.log('Available Account methods:', Object.getOwnPropertyNames(Account.prototype));

export { account, client };
