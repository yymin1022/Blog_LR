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

    // ── PINNED: Full-width hero card ──────────────────────────────────────────
    if (postIsPinned) {
        return (
            <Link href={postLink} className="block group w-full">
                <div className="w-full flex flex-row border-l-4 border-primary-blog_blue rounded-[16px] border border-l-4 border-[#E5E7EB] bg-gradient-to-br from-white to-[#F0F5FF] shadow-[0_4px_20px_rgba(22,78,171,0.07),0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(22,78,171,0.14),0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#164EAB]/30 transition-all duration-300 ease-out my-[12px] overflow-hidden min-h-[140px]">

                    {/* Image */}
                    <div className="w-[130px] sm:w-[180px] min-[1400px]:w-[220px] flex-shrink-0 overflow-hidden relative">
                        <img
                            src={imageSrc}
                            alt={postTitle}
                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                            loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F0F5FF]/20 pointer-events-none" />
                    </div>

                    {/* Text Body */}
                    <div className="flex-1 flex flex-col justify-between px-[16px] sm:px-[24px] py-[16px] min-w-0">
                        {/* Top: Badge + Tags */}
                        <div className="flex items-center gap-[8px] flex-wrap">
                            {/* Pinned Badge */}
                            <span className="inline-flex items-center gap-[5px] px-[10px] py-[3px] bg-primary-blog_blue text-white text-[10px] font-bold uppercase tracking-widest rounded-full font-nanum-b shadow-sm">
                                <span className="w-[5px] h-[5px] rounded-full bg-white/80 animate-pulse" />
                                Pinned
                            </span>
                            {postTag.slice(0, 2).map((tag) => (
                                <span key={tag} className="inline-block px-[8px] py-[2px] bg-[#E8EEFB] text-primary-blog_blue text-[10px] font-medium rounded-full font-nanum-r">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-[16px] sm:text-[19px] min-[1400px]:text-[22px] font-black text-[#1F2937] group-hover:text-primary-blog_blue transition-colors text-left line-clamp-2 leading-snug mt-[10px] font-nanum-b">
                            {postTitle}
                        </h2>

                        {/* Date + Arrow */}
                        <div className="flex items-center justify-between mt-[12px]">
                            <span className="text-[12px] sm:text-[13px] text-primary-blog_gray font-nanum-r">
                                {postDate}
                            </span>
                            <span className="text-primary-blog_blue text-[13px] font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-nanum-b pr-[4px]">
                                읽기 →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // ── REGULAR card ──────────────────────────────────────────────────────────
    return (
        <Link href={postLink} className="block group">
            <div className="w-[160px] sm:w-[200px] min-[1400px]:w-[280px] flex flex-col border border-[#E5E7EB] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(22,78,171,0.08)] hover:border-[#164EAB]/30 transition-all duration-300 ease-out my-[10px] bg-white overflow-hidden">
                {/* Image */}
                <div className="w-full aspect-square overflow-hidden relative">
                    <img
                        src={imageSrc}
                        alt={postTitle}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                </div>
                {/* Text */}
                <div className="flex flex-col flex-1 p-[12px] min-[1400px]:p-[16px]">
                    <h2 className="text-[13px] min-[1400px]:text-[15px] font-bold text-[#1F2937] group-hover:text-primary-blog_blue transition-colors text-left line-clamp-2 leading-snug font-nanum-b">
                        {postTitle}
                    </h2>
                    <p className="text-[11px] min-[1400px]:text-[12px] text-primary-blog_gray text-left mt-[6px] font-nanum-r">
                        {postDate}
                    </p>
                    <div className="flex flex-row items-center mt-[8px]">
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