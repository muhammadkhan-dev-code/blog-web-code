import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/app_config";
import { Button, Container } from "../components";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-full flex justify-center mb-8 relative bg-white rounded-xl shadow-lg overflow-hidden">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="shadow-lg hover:bg-green-600 transition-colors">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg hover:bg-red-600 transition-colors">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="w-full mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 leading-tight">{post.title}</h1>
                            <div className="h-1 w-20 bg-blue-500 mt-4 rounded"></div>
                        </div>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}