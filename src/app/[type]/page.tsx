import React from "react";
import PostCard from "@/app/[type]/_component/PostCard/PostCard";
import { getFBPostList, PostData } from "@/utils/FirebaseUtil";
import { redirect } from "next/navigation";

export default async function PostListPage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;
    if (type === "about") {
        redirect("/about/Useful");
    }
    const result = await getFBPostList(type);
    const postList: PostData[] = result.RESULT_CODE === 200 ? result.RESULT_DATA.PostList : [];

    const pinnedPosts = postList.filter((post) => post.postIsPinned);
    const unpinnedPosts = postList.filter((post) => !post.postIsPinned);

    return (
        <div className="w-full max-w-[1000px] flex flex-col mx-auto px-[16px] sm:px-[24px] py-[30px] lg:my-[50px] animate-fade-in-up select-none">

            {/* ── Pinned / Featured Posts Section ─────────────── */}
            {pinnedPosts.length > 0 && (
                <div className="w-full mb-[10px]">
                    <div className="flex items-center gap-[8px] mb-[6px]">
                        <span className="w-[3px] h-[16px] bg-primary-blog_blue rounded-full" />
                        <span className="text-[12px] font-bold text-primary-blog_blue uppercase tracking-widest font-nanum-b">Featured</span>
                    </div>
                    <div className="flex flex-col w-full">
                        {pinnedPosts.map((post) => (
                            <PostCard key={post.postID} post={post} postType={type} />
                        ))}
                    </div>
                </div>
            )}

            {/* Divider */}
            {pinnedPosts.length > 0 && unpinnedPosts.length > 0 && (
                <hr className="w-full border-0 bg-gradient-to-r from-transparent via-[#DDDDDD] to-transparent h-[1px] my-[16px]" />
            )}

            {/* ── Regular Posts Grid ───────────────────────────── */}
            {unpinnedPosts.length > 0 && (
                <div className="w-full">
                    {pinnedPosts.length > 0 && (
                        <div className="flex items-center gap-[8px] mb-[12px]">
                            <span className="w-[3px] h-[16px] bg-[#DDDDDD] rounded-full" />
                            <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest font-nanum-b">Posts</span>
                        </div>
                    )}
                    <div className="w-full flex flex-row flex-wrap gap-[12px] sm:gap-[16px] justify-center min-[1400px]:justify-start">
                        {unpinnedPosts.map((post) => (
                            <PostCard key={post.postID} post={post} postType={type} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
