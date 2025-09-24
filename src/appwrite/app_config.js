
import { Client, Databases, ID, Query, Storage } from 'appwrite';
import config from '../config/config';

export class  Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
           .setEndpoint(config.appWriteUrl)
           .setProject(config.appWriteProjectId);
        
           this.databases= new Databases(this.client);
           this.storage= new Storage(this.client);

    }

    async createPost({title,slug,content,featuredImage, status, userId}){
        return await this.databases.createDocument(
            config.appWriteDataBaseId,
            config.appWriteArticleId,
            slug,
            {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            }
        );
    }

    async updatePost({slug, title,content,featuredImage, status}){
        return await this.databases.updateDocument(
            config.appWriteDataBaseId,
            config.appWriteArticleId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        );
    }

    async deletePost (slug){
        await this.databases.deleteDocument(
            config.appWriteDataBaseId,
            config.appWriteArticleId,
            slug
        );
        return true;
    }
async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appWriteDataBaseId,
            config.appWriteArticleId,
            slug
        );
    } catch {
        return false;
    }
}

async getPosts(queries= [Query.equal('status','active')]){
    return await this.databases.listDocuments(
        config.appWriteDataBaseId,
        config.appWriteArticleId,
        queries
    );
}

// file upload services 


async uploadFile(file){
    return await this.storage.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
    );
}

async deleteFile(fileId){
    try {
        return await this.storage.deleteFile(
            config.appWriteBucketId,
            fileId
        );
    } catch {
        return false;
    }
}

 getFilePreview(fileId){
  return this.storage.getFilePreview(
    config.appWriteBucketId,
    fileId
  ); 
}

}


const service = new Service();

export default service;

