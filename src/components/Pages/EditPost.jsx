import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import databasesService from "../../appwrite/DatabasesService.js";

function EditPost() {
    const [post, setPost] = useState([]);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            databasesService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate]);


    return post ?
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div> : null;
}

export default EditPost;