import { useEffect, useState } from 'react';
import appwriteService from "../appwrite/app_config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }).catch(() => {
            // Handle error silently or show user-friendly message
        });
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-8 text-center bg-gradient-to-r from-blue-50 to-indigo-100">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-8 w-full max-w-md">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    Welcome to Our Blog
                                </h1>
                                <p className="text-gray-600 mb-6">
                                    Login to read and create amazing posts
                                </p>
                                <div className="text-4xl mb-4">📚</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8 bg-gray-50 min-h-screen'>
            <Container>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                        Latest Blog Posts
                    </h1>
                    <p className="text-center text-gray-600">
                        Discover amazing content from our community
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home