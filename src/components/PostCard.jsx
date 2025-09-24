import { Link } from "react-router-dom";
import appwriteService from "../appwrite/app_config";

const PostCard = ({ $id, title, featuredImage, slug }) => {
  return (
    <Link to={`/post/${slug || $id}`} className="block group">
      <div className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="w-full mb-4 overflow-hidden rounded-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default PostCard;
