import React from "react";
import Link from "next/link";
import { PostData } from "@/utils/FirebaseUtil";

interface PostCardDesktopProps {
    post: PostData;
    postType: string;
}

const PostCardDesktop: React.FC<PostCardDesktopProps> = ({ post, postType }) => {
    const { postDate, postID, postIsPinned, postTag, postTitle, postURL } = post;

    let thumbFile = "thumb.png";
    if (postType === "solving") {
        if (postIsPinned) {
            thumbFile = "thumb_boj.png";
        } else {
            thumbFile = "thumb_programmers.png";
        }
    }

    const imageSrc = `/api/getPostImage?postType=${postType}&postID=${postURL}&srcID=${thumbFile}`;
    const postLink = `/${postType}/${postID}`;

    if (postIsPinned) {
        return (
            <Link href={postLink} className="block">
                <div className="w-full h-[150px] flex flex-row shadow-[0_1px_2px_rgba(0,0,0,0.15)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-shadow duration-300 ease-in-out my-[15px] bg-primary-blog_white overflow-hidden">
                    {/* Image Container */}
                    <div className="w-[150px] h-[150px] flex-shrink-0">
                        <img
                            src={imageSrc}
                            alt={postTitle}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    {/* Text Container */}
                    <div className="flex-1 h-[150px] flex flex-col justify-center px-[20px] py-[10px] min-w-0">
                        <h2 className="text-[17px] font-black text-primary-blog_blue text-left line-clamp-2 leading-[22px]">
                            {postTitle}
                        </h2>
                        <p className="text-[14px] text-primary-blog_gray text-left mt-[10px] font-nanum-r">
                            {postDate}
                        </p>
                        <p className="text-[14px] text-primary-blog_lightgray_1 text-left mt-[5px] font-nanum-r">
                            #{postTag[0]}
                        </p>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={postLink} className="block">
            <div className="w-[350px] min-[1400px]:w-[300px] h-[150px] min-[1400px]:h-[450px] flex flex-row min-[1400px]:flex-col shadow-[0_1px_2px_rgba(0,0,0,0.15)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-shadow duration-300 ease-in-out my-[15px] bg-primary-blog_white overflow-hidden">
                {/* Image Container */}
                <div className="w-[150px] min-[1400px]:w-[300px] h-[150px] min-[1400px]:h-[300px] flex-shrink-0">
                    <img
                        src={imageSrc}
                        alt={postTitle}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                {/* Text Container */}
                <div className="w-[200px] min-[1400px]:w-[300px] h-[150px] flex flex-col justify-center min-[1400px]:justify-start px-[20px] py-[10px] min-[1400px]:pt-[15px]">
                    <h2 className="text-[17px] min-[1400px]:text-[20px] font-black text-primary-blog_blue text-left line-clamp-2 leading-[22px] min-[1400px]:h-[44px]">
                        {postTitle}
                    </h2>
                    <p className="text-[14px] min-[1400px]:text-[15px] text-primary-blog_gray text-left mt-[10px] min-[1400px]:mt-[15px] font-nanum-r">
                        {postDate}
                    </p>
                    <p className="text-[14px] min-[1400px]:text-[15px] text-primary-blog_lightgray_1 text-left mt-[5px] min-[1400px]:mt-[10px] font-nanum-r">
                        #{postTag[0]}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PostCardDesktop;