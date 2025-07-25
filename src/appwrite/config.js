import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from 'appwrite'

class Service {
    client = new Client()
    databases
    bucket
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project_id)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
           return await this.databases.updateDocument(conf.appwrite_database_id,
               conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwrite_database_id, 
                conf.appwrite_collection_id, 
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error)
        }
    }

    async getAllPost(){
        try {
            return await this.databases.listDocuments(conf.appwrite_database_id,
                conf.appwrite_collection_id,
                [
                    Query.equal('status','active')
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error ", error)
        }
    }

    //upload images
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwrite_bucket_id,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: uploadImage :: error ", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwrite_bucket_id,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error)
            return false
        }
    }

/*
    async updateFile(fileId){
        try {
            return await this.bucket.updateFile(conf.appwrite_bucket_id,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: updateImage :: error ", error)
            return false
        }
    }

    note -> update file is used to update the meta data of file not file itself

*/ 

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(conf.appwrite_bucket_id,
                fileId
            ) 
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error ", error)
            return false
        }
    }
}

const appwriteServices = new Service()
export default appwriteServices