import { Container, PostCard } from "../index.js";
import databasesService from "../../appwrite/DatabasesService.js";
import { useState, useEffect } from "react";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

function MyPostsPage() {
    const userId = useSelector((state) => state.auth.userId);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userId)
            databasesService
                .getPosts([Query.equal("userId", userId)])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                });
    }, [userId]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No post available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w=1/4">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default MyPostsPage;
