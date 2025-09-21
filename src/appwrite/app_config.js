
import config from '../config/config' ;
import {Client , ID, Databases,Storage, Querry} from 'appwrite';

export class  Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
           .setEndpoint(config.apWriteUrl)
           .setProject(config.apWriteProjectId);
        
           this.databases= new Databases(this.client);
           this.storage= new Storage(this.client);

    }

    async createPost({title,slug,content,featuredImage, status, userId}){
        try {
            let createdPost= await this.databases.createDocument(
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
            )
            
            return createdPost;
            
        } catch (err) {
      console.error(`create post method have error: ${err.message}`);
      throw err;
    }

    }

    async updatePost({slug, title,content,featuredImage, status}){

        try {
            let updatedPost=await  this.databases.updateDocument(
                config.appWriteDataBaseId,
                config.appWriteArticleId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
            
                }
            )
            return updatedPost;
            
        } catch (err) {
      console.error(`update post method have error: ${err.message}`);
      throw err;
    }

    }

    async deletePost (slug){
        try {
          await  this.databases.deleteDocument(
            config.appWriteDataBaseId,
            config.appWriteArticleId,
            slug,

            );
            return true;

          

        } catch (err) {
             console.error(`delete post method have error: ${err.message}`);
             throw err;
            //  return false;

        }

    }
async getPost(slug){
    try {
  return await this.databases.getDocument(
    config.appWriteDataBaseId,
    config.appWriteArticleId,
    slug,
  )
        
    } catch (error) {
        console.log(`Get post method have Error : ${error}`);
return false;
    }
}

async getPosts(queries= [Querry.equal('status','active')]){

    try {
        return await this.databases.listDocuments(
            config.appWriteDataBaseId,
            config.appWriteArticleId,
           queries,

        )
        
    } catch (error) {
         console.log(`Get posts method have Error : ${error}`);
        
    }
}

// file upload services 


async uploadFile(file){
    try {
        return  await this.databases.createFile(
            config.appWriteBucketId,
            ID.unique,
            file,

        )
    } catch (error) {
         console.log(`upload file method have Error : ${error}`);
    }
}

async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            config.appWriteBucketId,
            fileId
        )
    } catch (error) {
         console.log(`delete file  method have Error : ${error}`);
         return false;
        
    }
}

 getFilePreview(fileId){
  return this.bucket.getFilePreview(
    config.appWriteBucketId,
    fileId
  ) 
}

}


const service = new Service();

export default service;

