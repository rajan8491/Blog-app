import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite'

class AuthService {
    client = new Client()
    account
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project_id)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                this.loginAccount({email, password})
            } else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

    async loginAccount({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logoutUser(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error)
        }
    }

}

export const authService = new AuthService();

export default authService