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
            <Link href={postLink} className="block group">
                <div className="w-[350px] min-[1400px]:w-[450px] h-[150px] flex flex-row border border-[#E5E7EB] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(22,78,171,0.08),0_5px_15px_rgba(0,0,0,0.03)] hover:border-[#164EAB]/30 transition-all duration-300 ease-out my-[15px] bg-primary-blog_white overflow-hidden">
                    {/* Image Container */}
                    <div className="w-[150px] h-[150px] flex-shrink-0 overflow-hidden relative">
                        <img
                            src={imageSrc}
                            alt={postTitle}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            loading="lazy"
                        />
                    </div>
                    {/* Text Container */}
                    <div className="w-[200px] min-[1400px]:w-[300px] h-[150px] flex flex-col justify-center px-[20px] py-[10px] min-w-0">
                        <div className="flex items-center gap-[4px] text-[11px] font-bold text-primary-blog_blue uppercase tracking-wider mb-[4px] font-nanum-b">
                            <span className="w-[5px] h-[5px] rounded-full bg-primary-blog_blue animate-pulse" />
                            Pinned
                        </div>
                        <h2 className="text-[16px] font-bold text-[#1F2937] group-hover:text-primary-blog_blue group-hover:underline transition-colors text-left line-clamp-2 leading-[20px] font-nanum-b">
                            {postTitle}
                        </h2>
                        <p className="text-[13px] text-primary-blog_gray text-left mt-[8px] font-nanum-r">
                            {postDate}
                        </p>
                        <div className="flex flex-row items-center mt-[8px]">
                            <span className="inline-block px-[8px] py-[2px] bg-[#F3F4F6] text-[#6B7280] text-[11px] font-medium rounded-full font-nanum-r transition-colors group-hover:bg-[#E5E7EB]">
                                #{postTag[0]}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={postLink} className="block group">
            <div className="w-[350px] min-[1400px]:w-[300px] h-[150px] min-[1400px]:h-[450px] flex flex-row min-[1400px]:flex-col border border-[#E5E7EB] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(22,78,171,0.08),0_5px_15px_rgba(0,0,0,0.03)] hover:border-[#164EAB]/30 transition-all duration-300 ease-out my-[15px] bg-primary-blog_white overflow-hidden">
                {/* Image Container */}
                <div className="w-[150px] min-[1400px]:w-[300px] h-[150px] min-[1400px]:h-[300px] flex-shrink-0 overflow-hidden relative">
                    <img
                        src={imageSrc}
                        alt={postTitle}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                </div>
                {/* Text Container */}
                <div className="w-[200px] min-[1400px]:w-[300px] h-[150px] flex flex-col justify-center min-[1400px]:justify-start px-[20px] py-[10px] min-[1400px]:pt-[18px] min-w-0">
                    <h2 className="text-[16px] min-[1400px]:text-[18px] font-bold text-[#1F2937] group-hover:text-primary-blog_blue group-hover:underline transition-colors text-left line-clamp-2 leading-[20px] min-[1400px]:leading-[24px] min-[1400px]:h-[48px] font-nanum-b">
                        {postTitle}
                    </h2>
                    <p className="text-[13px] min-[1400px]:text-[14px] text-primary-blog_gray text-left mt-[8px] min-[1400px]:mt-[12px] font-nanum-r">
                        {postDate}
                    </p>
                    <div className="flex flex-row items-center mt-[8px] min-[1400px]:mt-[12px]">
                        <span className="inline-block px-[8px] py-[2px] bg-[#F3F4F6] text-[#6B7280] text-[11px] font-medium rounded-full font-nanum-r transition-colors group-hover:bg-[#E5E7EB]">
                            #{postTag[0]}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCardDesktop;