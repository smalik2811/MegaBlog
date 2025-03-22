import { Link } from "react-router";
import storageService from "../../appwrite/StorageService";

const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    {featuredImage && (
                        <img
                            src={storageService.getFilePreview(featuredImage)}
                            alt={title}
                            className="rounded-xl h-40 w-full object-cover"
                        />
                    )}
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
};
export default PostCard;
