import { getDatabase, onValue, ref } from "firebase/database";
import { toArray } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    let { user_id } = useParams();

    const getPosts = () => {
        const db = getDatabase();
        onValue(
            ref(db, `/${user_id}/posts`),
            (snapshot) => {
                if (snapshot.exists()) {
                    // .reverse() to display posts with most recent on top
                    let new_posts: any[] = [];
                    snapshot.forEach((data: any) => {
                        let new_post = data.val();
                        new_post.key = data.key;
                        new_post.comments = toArray(new_post.comments);
                        new_posts.push(new_post);
                    });
                    setPosts(new_posts.reverse());
                }
            },
            {
                onlyOnce: false,
            }
        );
    };

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div className="flex flex-col sidebar-content space-y-10">
            <div>
                <div className="text-xl font-bold">Published Posts</div>
                <div>
                    {posts.map((post) => {
                        return <PostPreview post={post} />;
                    })}
                </div>
            </div>
            <div className="text-xl font-bold">Drafts</div>
        </div>
    );
}

function PostPreview(props: any) {
    return (
        <div className="card">
            <div className="text-lg font-bold">{props.post.title}</div>
            <div>{props.post.text}</div>
        </div>
    );
}

export default UserPosts;
