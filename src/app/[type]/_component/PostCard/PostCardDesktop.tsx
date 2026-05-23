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

    // ── PINNED card ───────────────────────────────────────────────────────────
    if (postIsPinned) {
        return (
            <Link href={postLink} className="block group w-full">
                <div className="w-full h-[130px] flex flex-row border border-[#E5E7EB] rounded-[14px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(22,78,171,0.08)] hover:border-[#164EAB]/30 transition-all duration-300 ease-out my-[10px] overflow-hidden">
                    {/* Image */}
                    <div className="w-[130px] sm:w-[160px] h-full flex-shrink-0 overflow-hidden">
                        <img
                            src={imageSrc}
                            alt={postTitle}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            loading="lazy"
                        />
                    </div>
                    {/* Text */}
                    <div className="flex-1 flex flex-col justify-center px-[16px] py-[12px] min-w-0">
                        <h2 className="text-[15px] sm:text-[16px] font-bold text-[#1F2937] group-hover:text-primary-blog_blue transition-colors text-left line-clamp-2 leading-snug font-nanum-b">
                            {postTitle}
                        </h2>
                        <p className="text-[12px] text-primary-blog_gray text-left mt-[6px] font-nanum-r">
                            {postDate}
                        </p>
                        <div className="flex flex-row flex-wrap items-center gap-[4px] mt-[6px]">
                            {postTag.slice(0, 2).map((tag) => (
                                <span key={tag} className="inline-block px-[8px] py-[2px] bg-[#F3F4F6] text-[#6B7280] text-[10px] font-medium rounded-full font-nanum-r group-hover:bg-[#E5E7EB] transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // ── REGULAR card ──────────────────────────────────────────────────────────
    return (
        <Link href={postLink} className="block group">
            <div className="w-[160px] sm:w-[200px] min-[1400px]:w-[280px] flex flex-col border border-[#E5E7EB] rounded-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(22,78,171,0.08)] hover:border-[#164EAB]/30 transition-all duration-300 ease-out my-[10px] bg-white overflow-hidden">
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={postTitle}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                </div>
                {/* Text */}
                <div className="flex flex-col flex-1 p-[12px]">
                    <h2 className="text-[13px] min-[1400px]:text-[14px] font-bold text-[#1F2937] group-hover:text-primary-blog_blue transition-colors text-left line-clamp-2 leading-snug font-nanum-b">
                        {postTitle}
                    </h2>
                    <p className="text-[11px] text-primary-blog_gray text-left mt-[5px] font-nanum-r">
                        {postDate}
                    </p>
                    <div className="flex flex-row items-center mt-[6px]">
                        <span className="inline-block px-[7px] py-[2px] bg-[#F3F4F6] text-[#6B7280] text-[10px] font-medium rounded-full font-nanum-r transition-colors group-hover:bg-[#E5E7EB] truncate max-w-full">
                            #{postTag[0]}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );

};

export default PostCardDesktop;