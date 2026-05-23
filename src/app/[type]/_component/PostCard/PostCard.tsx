import React from "react";
import PostCardDesktop from "@/app/[type]/_component/PostCard/PostCardDesktop";
import { PostData } from "@/utils/FirebaseUtil";

interface PostCardProps {
    post: PostData;
    postType: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, postType }) => {
    return (
        <div className="hidden lg:block">
            <PostCardDesktop post={post} postType={postType} />
        </div>
    );
};

export default PostCard;