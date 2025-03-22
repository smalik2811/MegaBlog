import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { Container, Button } from "../index.js";
import databasesService from "../../appwrite/DatabasesService.js";
import storageService from "../../appwrite/StorageService.js";
import parse from "html-react-parser";

export default function PostPage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.auth.userId);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        if (slug) {
            databasesService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (post && userId) {
            setIsAuthor(post.userId === userId);
        } else {
            setIsAuthor(false);
        }
    }, [post, userId]);

    const deletePost = () => {
        databasesService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 max-w-[80ch] mx-auto">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-h-60 w-full object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}
