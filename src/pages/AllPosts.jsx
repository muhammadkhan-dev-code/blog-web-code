import { useEffect, useState } from 'react';
import appwriteService from '../appwrite/app_config';
import { Container, PostCard } from '../components';
const AllPosts = () => {
    const [posts,setPosts]= useState([]);

    useEffect(() => {
      appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
      },)
     
    }, []);
    
  return (
    <div className='w-full py-8 bg-gray-50 min-h-screen'>
        <Container>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    All Blog Posts
                </h1>
                <p className="text-center text-gray-600">
                    Explore all the amazing content from our community
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {posts.map((post)=>(
                    <PostCard key={post.$id} {...post}/>
                ))}
            </div>
        </Container>      
    </div>
  )
}

export default AllPosts
