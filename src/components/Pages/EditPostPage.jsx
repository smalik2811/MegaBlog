import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, PostForm } from "../index.js";
import databasesService from "../../appwrite/DatabasesService.js";
import { useSelector } from "react-redux";

function EditPostPage() {
    const userId = useSelector((state) => state.auth.userId);
    const [post, setPost] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            databasesService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate, userId]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPostPage;
